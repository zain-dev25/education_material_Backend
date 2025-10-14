import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/tokens.js";
import User from "../models/user.model.js";

const signup = async (req, res) => {

  const { email, password, username } = req.body;

  if (!email) return res.status(400).json({ message: "email required" });
  if (!username) return res.status(400).json({ message: "username required" });
  if (!password) return res.status(400).json({ message: "password required" });

  const existingemail = await User.findOne({ email })
  if (existingemail) return res.status(401).json({ message: "user already registered with email" });
  const alreadyTakenUserName = await User.findOne({ username });
  if (alreadyTakenUserName) return res.status(401).json({ message: "username already registered" });

  const createUser = await User.create({
    email,
    password,
    username,
    role: "user"
  });

  try {
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = generateAccessToken(user);
      //   const refreshToken = generateRefreshToken(user);

      const { password: _, ...userWithoutPassword } = user.toObject();

      return res.json({
        message: "User logged in",
        role: user.role,
        user: userWithoutPassword,
        accessToken,
      });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = password == user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const accessToken = generateAccessToken(user);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.json({
      message: "Admin logged in",
      role: user.role,
      user: userWithoutPassword,
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const getUser = async (req, res) => {
  try {
    if (!req.user) {
      const user = await User.findById(req.userId).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json({ user, message: "User profile" });
    }

    return res.json({ user: req.user, message: "User profile" });
  } catch (error) {
    console.error("getUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export { signup, login, loginAdmin, getUser };
