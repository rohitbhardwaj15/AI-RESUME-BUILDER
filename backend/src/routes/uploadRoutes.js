import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload, uploadProfileImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/profile-image", protect, upload.single("image"), uploadProfileImage);

export default router;