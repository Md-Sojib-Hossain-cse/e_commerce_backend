import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder = "e-commerce",
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(new Error("Upload failed"));
        }

        resolve(result);
      },
    );

    stream.end(file.buffer);
  });
};

export default uploadToCloudinary;
