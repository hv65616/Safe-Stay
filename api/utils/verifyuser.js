import { errorhandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyuser = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies);
  if (!token) {
    return next(errorhandler(401, "Unauthorized"));
  }
  try {
    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
      if (err) return next(errorhandler(403, "Forbidden"));
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
