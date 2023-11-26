import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validuser = await User.findOne({ email });
    if (!validuser) {
      return next(errorhandler(404, "User not found"));
    }
    const validpassword = bcrypt.compareSync(password, validuser.password);
    if (!validpassword) {
      return next(errorhandler(401, "Invalid password"));
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWTSECRET);
    const { password: pass, ...rest } = validuser._doc;
    res
      .cookie("access-token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access-token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedpassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedpassword, 10);
      const newuser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photoURL,
      });
      await newuser.save();
      const token = jwt.sign({ id: newuser._id }, process.env.JWTSECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access-token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
