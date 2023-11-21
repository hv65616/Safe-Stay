import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userrouter from "./routes/user.route.js";
import authrouter from "./routes/auth.route.js";
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
app.use("/api/user", userrouter);
app.use("/api/auth",authrouter)
app.listen(3000, (req, res) => {
  console.log("Server is running port 3000");
});
