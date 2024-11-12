import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const verifyUserJWT = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ??
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "No token provided, authorization denied",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id }).exec();
    req.user = user;
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied", success: false });
  }

  next();
};

export default verifyUserJWT;
