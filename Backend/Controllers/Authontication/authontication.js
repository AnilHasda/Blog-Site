import { authmodel } from "../../Models/auth.model.js";
import { apiErrors } from "../../Utils/apiErrors.js";
import { apiResponse } from "../../Utils/apiResponse.js";
import { authSchema } from "../../Models/auth.model.js";
import bcrypt from "bcrypt";

const authontication = async (req, resp, next) => {
  let { user, password } = req.body;
  let findUser = await authmodel.find({ user });
  if (findUser.length > 0) {
    if (await bcrypt.compare(password, findUser[0].password)===true) {
      let response = new apiResponse(200, "user logged in successfull");
      let access_token = authSchema.methods.generateAccessToken(
        req.body,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRES
      );
      resp.cookie("access_token", access_token, {
        maxAge: process.env.ACCESS_COOKIE_EXPIRES,
        secure: true,
        httpOnly: true,
      });
      resp
        .status(response.statusCode)
        .json({ message: response.message, success: response.success ,isLoggin:true});
    } else {
      next(new apiErrors(404, "password doesnot match"));
    }
  } else {
    next(new apiErrors(404, "please enter valid user"));
  }
};
export { authontication };
