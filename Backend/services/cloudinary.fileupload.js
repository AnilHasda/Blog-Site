import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// function that uploads files into cloudinary
const cloudinaryFileUpload = async (filePath, folderName) => {
  try {
    if (filePath) {
      const uploadOptions = folderName
        ? { folder: folderName, resource_type: "image" }
        : {};
      const uploadImage = await cloudinary.uploader.upload(
        filePath,
        uploadOptions
      );
      if (uploadImage) {
        console.log("image uploaded into cloudinary");
        fs.unlinkSync(filePath);
        return uploadImage;
      } else {
        console.log("Failed to upload image into cloudinary");
        fs.unlinkSync(filePath);
      }
    } else {
      console.log("requested file not found");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { cloudinaryFileUpload };
