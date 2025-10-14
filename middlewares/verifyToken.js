import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith?.("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        if (!decoded?.id) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;

        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        req.user = user;

        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Token invalid or expired" });
    }
};

export default verifyToken;
