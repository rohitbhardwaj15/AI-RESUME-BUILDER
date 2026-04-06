import express from "express";
import {
  createResume,
  deleteResume,
  getMyResumes,
  getPublicResumeBySlug,
  getResumeById,
  toggleVisibility,
  updateResume
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/public/:slug", getPublicResumeBySlug);
router.route("/").post(protect, createResume).get(protect, getMyResumes);
router.route("/:id").get(protect, getResumeById).put(protect, updateResume).delete(protect, deleteResume);
router.patch("/:id/visibility", protect, toggleVisibility);

export default router;