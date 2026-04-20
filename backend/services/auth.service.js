import User from "../models/user.model.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";


// SIGNUP SERVICE
export const signUpService = async (data) => {
  const { firstName, lastName, userName, email, password, role } = data;

  // Check if user exists
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
    role
  });

  return newUser;
};


// LOGIN SERVICE
export const loginService = async (email, password) => {
  // Check user
  const existUser = await User.findOne({ email });
  if (!existUser) {
    throw new Error("User not found");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, existUser.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return existUser;
};


//GET USER FROM TOKEN
export const getUserFromToken = async (token) => {
  // Verify token
  const decoded = verifyToken(token);

  // Fetch user
  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};