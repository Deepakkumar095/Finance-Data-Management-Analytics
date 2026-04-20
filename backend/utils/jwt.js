import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// GENERATE TOKEN
export const generateToken = (id) => {
    let generate_token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return generate_token;
};

// VERIFY TOKEN
export const verifyToken = (token) => {
    let verify_token = jwt.verify(token, process.env.JWT_SECRET);
    return verify_token;
};