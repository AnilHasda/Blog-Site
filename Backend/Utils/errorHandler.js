import { apiErrors } from "./apiErrors.js";
const errorHandler = (err, req, resp, next) => {
  console.log("error handler");
  if (err instanceof apiErrors) {
    resp.status(err.statusCode).json({ message: err.message });
  } else {
    if (err?.errorCode !== 11000) {
      resp.status(500).json({ message: "internal server error" });
    } else {
      resp.status(406).json({
        message:
          Object.keys(err.message) +
          " " +
          Object.values(err.message) +
          " already exists",
      });
    }
  }
};
export default errorHandler;
