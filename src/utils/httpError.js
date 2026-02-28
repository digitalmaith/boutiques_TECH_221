class HttpError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

function httpError(status, message, details = null) {
  return new HttpError(status, message, details);
}

export { HttpError, httpError };
export default httpError;
