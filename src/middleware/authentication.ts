import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errors/HttpException";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { UserType } from "../types";

declare module "express" {
  export interface Request {
    currentUser?: UserType;
  }
}

export const authenticationRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new HttpException(401, "Unauthorized");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new HttpException(401, "Unauthorized");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new HttpException(401, "Unauthorized");
  }

  const decodedToken = jwt.decode(token) as UserType;

  req.currentUser = {
    email: decodedToken.email,
    id: decodedToken.id,
    isAdmin: decodedToken.isAdmin,
    name: decodedToken.name,
  };

  next();
};
