import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// public images
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public/uploads")));

// accept data from frontend in json format
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// error middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
    console.log(`Database connected`);
  });
} catch (error) {
  console.log(error);
}
