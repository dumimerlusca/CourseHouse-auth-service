import { FieldValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  error: FieldValidationError;

  constructor(errors: FieldValidationError[]) {
    super(errors[0]?.msg ?? "Validation error");
    this.error = errors[0];

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return {
      message: this.error?.msg ?? "Validation error",
      field: this.error.path ?? "",
    };
  }
}
