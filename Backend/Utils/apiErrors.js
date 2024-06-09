class apiErrors extends Error {
  constructor(statusCode, message = "something went wrong",success=false) {
    super(message)
    this.statusCode = statusCode;
    this.message = message;
    this.success=success;
  }
}
export {apiErrors};
