import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()


function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_TOKEN,
    { expiresIn: "1d" }
  );
}


export { generateAccessToken };
