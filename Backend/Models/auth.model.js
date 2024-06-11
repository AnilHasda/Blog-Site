import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
// schema for user registration
export const authSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const generateHash = async (docs, next) => {
  console.log(docs);
  if (!docs.isModified("password")) {
    return next();
  } else {
    try {
      let hashedPassword = await bcrypt.hash(docs.password, 10);
      docs.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
};
authSchema.pre("save", async function (next) {
  await generateHash(this, next);
});

//function that generates access token
authSchema.methods.generateAccessToken = (payload, secret, expires) =>{
  return jwt.sign(payload, secret, { expiresIn: expires });
}

// function that generates refresh token
authSchema.methods.generateRefreshToken = (payload, secret, expires) =>
  jwt.sign(payload, secret, { expiresIn:expires });
authSchema.methods.test = () => {
  console.log("this is testing message");
};

//function that checks user

export const authmodel = model("authmodel", authSchema);
