import { Router } from "express";
import authRoutes from "./auth.routes.js";
import fileRoute from "./file.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to MObile App Backend");
});
router.use("/api/v1/file", fileRoute);
router.use("/api/v1/auth", authRoutes);

export default router;
