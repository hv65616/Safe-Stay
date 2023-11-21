import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorhandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  //   console.log(req.body);
  const { username, email, password } = req.body;
  const hashedpassword = bcrypt.hashSync(password, 10);
  const newuser = new User({ username, email, password: hashedpassword });
  try {
    await newuser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(errorhandler(550, "error from the function"));
  }
};
