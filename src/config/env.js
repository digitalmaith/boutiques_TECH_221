import dotenv from "dotenv";

dotenv.config();

const env = {
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 3000,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

export default env;

