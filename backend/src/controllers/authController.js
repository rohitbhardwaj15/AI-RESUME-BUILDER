import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const err = new Error("Name, email and password are required.");
    err.statusCode = 400;
    throw err;
  }

  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already in use.");
    err.statusCode = 409;
    throw err;
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, profile: user.profile }
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error("Invalid credentials.");
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user._id);
  res.json({
    success: true,
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, profile: user.profile }
    }
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    const err = new Error("Email is required.");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: true,
      message: "If the email exists, a password reset link has been generated."
    });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  const frontendBase = (process.env.FRONTEND_URL || "http://localhost:5173").split(",")[0].trim();
  const resetUrl = `${frontendBase}/reset-password/${rawToken}`;

  res.json({
    success: true,
    message: "Password reset link generated.",
    data: {
      resetUrl
    }
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token || !password) {
    const err = new Error("Token and new password are required.");
    err.statusCode = 400;
    throw err;
  }

  if (password.length < 6) {
    const err = new Error("Password must be at least 6 characters.");
    err.statusCode = 400;
    throw err;
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpiresAt: { $gt: new Date() }
  });

  if (!user) {
    const err = new Error("Invalid or expired reset token.");
    err.statusCode = 400;
    throw err;
  }

  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpiresAt = null;
  await user.save();

  res.json({
    success: true,
    message: "Password has been reset successfully."
  });
});
