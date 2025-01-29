import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/addresses", addressRoutes);

app.get("/", (req, res) => {
    res.send("API is configuring.")
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${port}`));
