import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET

});

try {
    if (!filePath) {
      return { error: "File path is required" };
    }
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto"}); 
      fs.unlinkSync(filePath); // Delete the file after uploading
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return { error: "Failed to upload to Cloudinary" };
  }
}

export default uploadOnCloudinary;