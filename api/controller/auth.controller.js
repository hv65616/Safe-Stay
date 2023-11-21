import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
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
    res.status(500).json(error.message);
  }
};
