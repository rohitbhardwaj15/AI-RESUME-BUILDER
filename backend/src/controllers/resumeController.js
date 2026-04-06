import Resume from "../models/Resume.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createResumeSlug } from "../utils/slug.js";

const defaultResumePayload = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    imageUrl: ""
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: []
};

export const createResume = asyncHandler(async (req, res) => {
  const title = req.body.title?.trim() || "Untitled Resume";

  const resume = await Resume.create({
    userId: req.user._id,
    title,
    slug: createResumeSlug(title),
    ...defaultResumePayload
  });

  res.status(201).json({ success: true, data: resume });
});

export const getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
  res.json({ success: true, data: resumes });
});

export const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
  if (!resume) {
    const err = new Error("Resume not found.");
    err.statusCode = 404;
    throw err;
  }
  res.json({ success: true, data: resume });
});

export const updateResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
  if (!resume) {
    const err = new Error("Resume not found.");
    err.statusCode = 404;
    throw err;
  }

  const previousTitle = resume.title;
  Object.assign(resume, req.body);
  if (req.body.title && req.body.title !== previousTitle) {
    resume.slug = createResumeSlug(req.body.title);
  }

  const saved = await resume.save();
  res.json({ success: true, data: saved });
});

export const deleteResume = asyncHandler(async (req, res) => {
  const deleted = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!deleted) {
    const err = new Error("Resume not found.");
    err.statusCode = 404;
    throw err;
  }

  res.json({ success: true, message: "Resume deleted." });
});

export const toggleVisibility = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
  if (!resume) {
    const err = new Error("Resume not found.");
    err.statusCode = 404;
    throw err;
  }

  resume.visibility = resume.visibility === "public" ? "private" : "public";
  const saved = await resume.save();

  res.json({
    success: true,
    data: {
      visibility: saved.visibility,
      shareUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/shared/${saved.slug}`
    }
  });
});

export const getPublicResumeBySlug = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ slug: req.params.slug, visibility: "public" }).populate(
    "userId",
    "name profile"
  );

  if (!resume) {
    const err = new Error("Public resume not found.");
    err.statusCode = 404;
    throw err;
  }

  res.json({ success: true, data: resume });
});
