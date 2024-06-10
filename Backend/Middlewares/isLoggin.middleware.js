import jwt from "jsonwebtoken";
import { authSchema } from "../Models/auth.model.js";
import { authmodel } from "../Models/auth.model.js";
const isLoggin = async (req, resp, next) => {
  let access_token = req.cookies.access_token;
  let refresh_token = req.cookies.refresh_token;
  if (!access_token) {
    if (!refresh_token) {
      resp
        .status(400)
        .json({ message: "unauthorized access sorry", isLoggin: false });
    } else {
      console.log("i am refresh token")
      let user = jwt.decode(refresh_token)?.user;
      console.log(user)
      let findUser = await authmodel.find({ user });
      req.userId = findUser[0]._id;
      if (findUser.length > 0) {
        let access_token = authSchema.methods.generateAccessToken(
          user,
          process.env.ACCESS_TOKEN_SECRET,
          process.env.ACCESS_TOKEN_EXPIRES
        );
        resp.cookie("access_token", access_token, {
          maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRES),
          secure: true,
          httpOnly: true,
        });
        next(req.userId);
      } else {
        resp
          .status(404)
          .json({ message: "unauthorized access", isLoggin: false });
      }
    }
  } else {
    let userCredentials = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(userCredentials);
    
    next();
  }
};
export { isLoggin };
