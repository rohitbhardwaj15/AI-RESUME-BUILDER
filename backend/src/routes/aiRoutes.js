import express from "express";
import { atsSuggestions, enhanceSummary, improveExperience } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/summary", protect, enhanceSummary);
router.post("/experience", protect, improveExperience);
router.post("/ats", protect, atsSuggestions);

export default router;