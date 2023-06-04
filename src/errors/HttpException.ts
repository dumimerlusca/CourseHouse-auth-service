import { CustomError } from "./CustomError";

export class HttpException extends CustomError {
  constructor(public statusCode: number, public message: string) {
    super(message);

    Object.setPrototypeOf(this, HttpException.prototype);
  }

  serializeError() {
    return {
      message: this.message,
    };
  }
}
