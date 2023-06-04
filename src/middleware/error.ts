import { Response, Request, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import { HttpException } from "../errors/HttpException";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({ error: error.serializeError() });
  }

  res.status(500).send({ error: error.message });
};
