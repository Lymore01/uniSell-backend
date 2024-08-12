import pkg from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const { v2: cloudinary } = pkg;

export default async function uploadImage(file) {
  cloudinary.config({
    cloud_name: "dz8lrlq52",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  // multer-storage-cloudinary
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "unisell",
      format: async (req, res) => "png",
      public_id: (req, res) =>
        `${Date.now()}-${file.originalname.split(".")[0]}`,
    },
  });

  const upload = multer({ storage });
  
  return upload.single('image');
}
