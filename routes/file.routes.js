import { Router } from "express";
import { getAllFiles, getFiles } from "../controllers/notes.controllers.js";
import { uploadFile } from "../controllers/uploadFile.controllers.js";
import deletFile from "../controllers/delete.controllers.js";

const router = Router();

// Example: GET /api/v1/get-file?grade=10&subject=Math&board=Punjab
router.get("/get-file", getFiles);
router.get("/get-All-file", getAllFiles);
router.put("/upload-file", uploadFile);
router.delete("/delete-file/:key", deletFile);

export default router;
