import { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/RequestValidationError";

export const checkValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array() as FieldValidationError[]);
  }

  next();
};
