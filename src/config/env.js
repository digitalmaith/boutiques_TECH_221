import dotenv from "dotenv";

dotenv.config();

const env = {
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 3000,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
};

export default env;
