import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userrouter from "./routes/user.route.js";
import authrouter from "./routes/auth.route.js";
import listingrouter from "./routes/listing.route.js"
import cookieParser from "cookie-parser";
dotenv.config();
mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userrouter);
app.use("/api/auth", authrouter);
app.use("/api/listing",listingrouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(3000, (req, res) => {
  console.log("Server is running port 3000");
});
