import dotenv from "dotenv";

dotenv.config();

const env = {
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 3000,
};

export default env;