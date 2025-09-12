import dotenv from "dotenv";
import { connectToMongoDB } from "./configs/connectToDatabase";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

async function startServer() {
  if (!MONGO_URI) {
    console.error("❌ MONGODB_URI environment variable is not set.");
    process.exit(1); // Exit with failure
  }

  try {
    await connectToMongoDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
