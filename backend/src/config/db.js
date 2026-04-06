import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing in environment");

  const conn = await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB_NAME || "ai_resume_builder"
  });

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default connectDB;