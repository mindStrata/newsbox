import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const config = {
  port: Number(process.env.PORT) || 4100,
  db: {
    uri: process.env.DATABASE_URI || "mongodb://localhost:27017/", // MongoDB connection URI
    dbName: process.env.DATABASE_NAME || "Dev-Database", // MongoDB database name
  },
};

export default config;
