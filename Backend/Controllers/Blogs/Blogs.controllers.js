import { apiResponse } from "../../Utils/apiResponse.js";
import { apiErrors } from "../../Utils/apiErrors.js";
import { tryCatchWrapper } from "../../Utils/tryCatchWrapper.js";
import { blog } from "../../Models/addBlog.model.js";
import { cloudinaryFileUpload } from "../../services/cloudinary.fileupload.js";
import { ObjectId } from "mongodb";
const addBlog = tryCatchWrapper(async (req, resp) => {
  console.log(req.body)
  if (req.file) {
    let cloudinaryFIle = await cloudinaryFileUpload(
      req.file.path,
      "blogsiteFiles"
    );
    if (cloudinaryFIle?.url) {
      let insert = new blog({ ...req.body, cover_image: cloudinaryFIle.url });
      let finalResponse = await insert.save();
      if (finalResponse) {
        console.log(finalResponse);
        let response = new apiResponse(200, "Data inserted successfully", true);
        resp.status(response.statusCode).json({message:response.message,success:response.success});
      } else {
        throw new apiErrors(401, "failed to insert data");
      }
    } else {
      throw new apiErrors(  402,"failed to insert data into cloudinary");
    }
  } else {
    resp.status(404).json({ message: "image not found", success: false });
  }
});
const getBlogs =tryCatchWrapper(async (req,resp)=>{
    let responseData=await blog.find({});
    if(responseData){
        let response = new apiResponse(200,responseData, true);
        resp.status(response.statusCode).json({message:response.message,success:response.success});
    }else{
        throw new apiErrors(404, "Data not found");
    }
});

const editBlog = tryCatchWrapper(async (req, resp) => {
  let updateQuery = await blog.updateOne(
    { $id: req.params.id },
    { $set: req.body }
  );
  if (updateQuery) {
    let response = new apiResponse(200, "Data updated successfully", true);
    resp.status(response.statusCode).json({message:response.message,success:response.success});
  } else {
    throw new apiErrors(402, "failed to update data", false);
  }
});

const deleteBlog = tryCatchWrapper(async (req, resp) => {
  let deleteQuery = await blog.deleteOne({ _id: new ObjectId(req.params.id) });
  if (deleteQuery) {
    let response = new apiResponse(200, "Data updated successfully", true);
    resp.status(response.statusCode).json({message:response.message,success:response.success});
  } else {
    throw new apiErrors(403, "Failed to delete data", false);
  }
});
const test=(req,resp)=>{
console.log(req.body);
resp.send("test message");
}
export { addBlog, getBlogs, editBlog, deleteBlog,test };
