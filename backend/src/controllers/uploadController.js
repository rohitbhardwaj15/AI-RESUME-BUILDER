import multer from "multer";
import asyncHandler from "../utils/asyncHandler.js";
import { getImageKit } from "../config/imagekit.js";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

const removeBackgroundIfConfigured = async (base64Image) => {
  if (!process.env.REMOVEBG_API_KEY) return base64Image;

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": process.env.REMOVEBG_API_KEY },
    body: new URLSearchParams({ image_file_b64: base64Image, size: "preview" })
  });

  if (!response.ok) return base64Image;
  const buffer = Buffer.from(await response.arrayBuffer());
  return buffer.toString("base64");
};

export const uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    const err = new Error("Image file is required.");
    err.statusCode = 400;
    throw err;
  }

  let base64 = req.file.buffer.toString("base64");
  const removeBg = req.body.removeBackground === "true";
  if (removeBg) base64 = await removeBackgroundIfConfigured(base64);

  const imagekit = getImageKit();
  const result = await imagekit.upload({
    file: base64,
    fileName: `${Date.now()}-${req.file.originalname}`,
    folder: "/ai-resume-builder/profiles"
  });

  res.status(201).json({
    success: true,
    data: {
      url: result.url,
      fileId: result.fileId,
      note: removeBg && !process.env.REMOVEBG_API_KEY ? "remove.bg key missing; uploaded original image" : undefined
    }
  });
});