import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["pdf", "video" , "jpg" , "jpeg","image"], required: true },
  board: { type: String, required: true },
  major: { type: String, required: true },
  classLevel: { type: String, required: true },
  subject: { type: String, required: true },
  s3Key: { type: String, required: true },
  s3Url: { type: String },
  mdUrl: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
