class ApiError extends Error {
  statusCode: number;
  data: null;
  success: boolean;
  errors: never[];
  message: string;
  constructor(statusCode:number, message: string = "Something might be Gone wrong in Server", errors = [], stack: string = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
