import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const config = {
  port: Number(process.env.PORT) || 4100,
  db: {
    uri: process.env.DATABASE_URI || "mongodb://localhost:27017/", // MongoDB connection URI
    dbName: process.env.DATABASE_NAME || "Dev-Database", // MongoDB database name
  },
  jwtSecret: process.env.JWT_SECRET || "some_secret_code",
  SERVER_ENVIRONMENT: process.env.NODE_ENV || "development",
};

export default config;
