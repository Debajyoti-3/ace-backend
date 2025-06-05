import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // fs -> file system, nativly present in node js

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // file upload
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file upload completed
    console.log(
      `File Upload in Cloudinary Successfully Completed`,
      response.url
    );
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // it removes the loaclly saved temporary file as the upload fails
  }
};

export {uploadOnCloudinary}
