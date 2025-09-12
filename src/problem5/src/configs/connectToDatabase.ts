import mongoose from "mongoose";

/**
 * Connects to a MongoDB instance using Mongoose.
 *
 * @param {string} MONGO_URI - The MongoDB connection string.
 * @returns {Promise<void>} Resolves when the connection is successful.
 *
 * Logs a success message if connected, otherwise logs an error message.
 */
export async function connectToMongoDB(MONGO_URI: string) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("Failed to connect to MongoDB!", err);
  }
}
