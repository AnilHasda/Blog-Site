import { tryCatchWrapper } from "../../Utils/tryCatchWrapper.js";
import { apiErrors } from "../../Utils/apiErrors.js";
import { authmodel } from "../../Models/auth.model.js";
import { apiResponse } from "../../Utils/apiResponse.js";
import { authSchema } from "../../Models/auth.model.js";
const registration = tryCatchWrapper(async (req, resp) => {
  let refresh_token = authSchema.methods.generateRefreshToken(
    req.body,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRES
  );
  console.log({pocess:process.env.ACCESS_COOKIE_EXPIRES})
  let insertQuery = new authmodel({ ...req.body, refresh_token });
  let insertData = await insertQuery.save();
  if (insertData) {
    console.log(insertData);
    let access_token = authSchema.methods.generateAccessToken(
      req.body,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRES
    );
  
    let response = new apiResponse(201, "Your account has been created");
    resp.cookie("access_token", access_token, {
      maxAge: parseInt(process.env.ACCESS_COOKIE_EXPIRES),
      secure: true,
      httpOnly: true,
    });
    resp.cookie("refresh_token", refresh_token, {
      maxAge: parseInt(process.env.REFRESH_COOKIE_EXPIRES),
      secure: true,
      httpOnly: true,
    });
    resp
      .status(response.statusCode)
      .json({ message: response.message, success: response.success });
  } else {
    next(new apiErrors(400, "failed to create account"));
  }
});
export { registration };
