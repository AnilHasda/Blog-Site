import jwt from "jsonwebtoken";
import { authSchema } from "../Models/auth.model.js";
import { authmodel } from "../Models/auth.model.js";
const isLoggin = async (req, resp, next) => {
  let access_token = req.cookies.access_token;
  let refresh_token = req.cookies.refresh_token;
  if (!access_token) {
    if (!refresh_token) {
      resp.status(400).json({ message: "unauthorized access" });
    } else {
      let { user } = jwt.decode(refresh_token)
      let findUser = await authmodel.find({ user });
      if (findUser.length > 0) {
        let access_token = authSchema.methods.generateAccessToken(
          req.body,
          process.env.ACCESS_TOKEN_SECRET,
          process.env.ACCESS_TOKEN_EXPIRES
        );
        resp.cookie("access_token", access_token, {
          maxAge: 3600000,
          secure: true,
          httpOnly: true,
        });
        req.userName=user;
        next();
      } else {
        resp.status(404).json({ message: "unauthorized access" });
      }
    }
  } else {
    let { user } = jwt.decode(refresh_token);
    req.userName=user;
    next();
  }
};
export { isLoggin };
