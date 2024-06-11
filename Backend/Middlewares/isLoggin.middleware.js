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
      let user = jwt.decode(refresh_token)?.user;
      let findUser = await authmodel.find({ user });
      req.userId = findUser[0]._id;
      req.user=findUser[0].user;
      if (findUser.length > 0) {
        let new_access_token = await authSchema.methods.generateAccessToken(
          {user},
          process.env.ACCESS_TOKEN_SECRET,
          process.env.ACCESS_TOKEN_EXPIRES
        );
        resp.cookie("access_token", new_access_token, {
          maxAge: process.env.ACCESS_COOKIE_EXPIRES,
          secure: true,
          httpOnly: true,
        });
        req.userId=req.userId;
        req.user=req.user;
        next();
      } else {
        resp
          .status(404)
          .json({ message: "unauthorized access", isLoggin: false });
      }
    }
  } else {
    try {
      let userCredentials = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET
      );
      let user=userCredentials?.user;
      let findUser=await authmodel.find({user});
      if(findUser.length>0){
        req.userId=findUser[0]._id;
        req.user=findUser[0].user;
        next();
      }else{
        resp.status(500).json({message:"something went wrong",isLoggin:false});
      }
    } catch (error) {
      console.log(error);
      resp.status(400).json({ message: "token expired!", isLoggin: false });
    }
  }
};
export { isLoggin };
