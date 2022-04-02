class ApiError extends Error {
  statusCode;

  constructor(statusCode, message) {
    super(message);

    Object.setPrototypeOf(this, ApiError.prototype);

    this.name = `ApiError`;
    this.statusCode = statusCode;
  }
}

export { ApiError };
