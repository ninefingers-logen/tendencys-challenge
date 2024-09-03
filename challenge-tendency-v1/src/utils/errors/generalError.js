export class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}

export class GeneralError extends ApplicationError {
  constructor(message, cause, code) {
    super(message);
    this.cause = cause;
    this.code = code;
  }

  static badRequest(message, cause) {
    return new GeneralError(message, cause, 400);
  }

  static unauthorized(message, cause) {
    return new GeneralError(message, cause, 401);
  }

  static forbidden(message, cause) {
    return new GeneralError(message, cause, 403);
  }

  static notFound(message, cause) {
    return new GeneralError(message, cause, 404);
  }

  /**
   * 
   * @param {*} message 
   * @param {*} cause 
   * @returns 
   */

  static internalServer(message, cause) {
    console.log("🚀 ~ GeneralError ~ internalServer ~ message:", message);
    return new GeneralError(message, cause, 500);
  }
}