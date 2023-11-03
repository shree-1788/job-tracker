import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

// register controller
export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  // hash password
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

// login controller
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ msg: "user logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
