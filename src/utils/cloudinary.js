import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View Credentials' below to copy your API secret
});

const upload_file_On_Cloudinary = async(localfilePath) => {
    try {
        if (!localfilePath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type : 'auto'
        })
        console.log(`The local file path uplaoded to the cloudinary ${response.url}`);
        return response;
    } catch (error) {
        console.error(`The error is file is not successfully uploaded to the cloudinary!!!`);
        fs.unlink(localfilePath)
        return null;
    }
}


export {upload_file_On_Cloudinary}