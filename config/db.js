/**
 * @module config/db.js
 * @description Connects to the MongoDB database using Mongoose.
 */
import mongoose from "mongoose";
import config from "./config.js";

/**
 * @function connectDatabase
 * @async
 * @description Establishes a connection to the MongoDB database using the provided configuration.
 * @returns {Promise<void>} Does not return a value; logs success or failure.
 */
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.db.uri, {
      dbName: config.db.dbName,
    });
    console.log(`Connected to database: ${mongoose.connection.name}...`);
  } catch (error) {
    console.log(error);
    console.log(`Failed connecting to database...`);
  }
};

export default connectDatabase;

// Handle connection errors
mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err.message}`);
  process.exit(1); // Exit on connection error
});

/* 
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to app termination");
    process.exit(1);
  });
}); 
*/
