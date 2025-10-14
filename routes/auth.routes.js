import { getUser, login, loginAdmin, signup } from "../controllers/auth.controllers.js";
import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/loginAdmin", loginAdmin);

router.get("/getuser", verifyToken, getUser);

export default router;
