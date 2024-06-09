import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
let url = process.env.DB_URL;
const connection = () => {
  console.log(process.env.DB_NAME);
  mongoose
    .connect(url + process.env.DB_NAME)
    .then((response) => {
      console.log("connection successful");
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export { connection };
