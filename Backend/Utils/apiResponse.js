class apiResponse {
  constructor(statusCode, message,success=true) {
    this.statusCode = statusCode;
    this.message = message;
    this.success=success;
  }
}
export {apiResponse};