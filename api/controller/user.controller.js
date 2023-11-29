import { errorhandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
export const test = (req, res) => {
  res.json({
    success: "Successful",
  });
};

export const updateuser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorhandler(
        401,
        "You are authenticated. You can only update your account"
      )
    );
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateduser._doc;
    res.status(200).json({
      success: true,
      message: "User Updated Successfully!",
    });
  } catch (error) {
    next(error);
  }
};
