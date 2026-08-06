import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.log("MongoDB connection error:", error);
});

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});