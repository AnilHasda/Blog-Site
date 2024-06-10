import express from "express";
import { addBlog,getBlogs,deleteBlog } from "../../Controllers/Blogs/Blogs.controllers.js";
import { isLoggin } from "../../Middlewares/isLoggin.middleware.js";
import { uploadFiles } from "../../Middlewares/fileupload.middlewar.js";

const router=express.Router();

router.route("/addBlog").post(uploadFiles.single("cover_image"),addBlog);
router.route("/getBlogs").get(getBlogs);
router.route("/deleteBlog/:id").delete(deleteBlog);
export default router;