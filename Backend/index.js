import express from "express";
import { connection } from "./DB/connnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
let port = process.env.PORT || 5000;
let app = express();
connection();
//  import routers
import blogRouter from "./Routes/blogRoutes/blogRoutes.js";
import authRouter from "./Routes/authRoutes/authroutes.js";
import errorHandler from "./Utils/errorHandler.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", blogRouter);
app.use("/api/v1/auth/", authRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log("App is running at:" + port);
});
