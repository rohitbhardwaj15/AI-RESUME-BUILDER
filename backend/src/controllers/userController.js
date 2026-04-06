import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updates = {
    name: req.body.name,
    profile: {
      avatarUrl: req.body.profile?.avatarUrl,
      headline: req.body.profile?.headline
    }
  };

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  res.json({ success: true, data: user });
});