import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/items", itemRoutes);

export default app;