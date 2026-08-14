import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalname: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    extractedText: {
      type: String,
      required: true,
    },
    totalCharacters: {
      type: Number,
      required: true,
    },
    extractionMethod: {
      type: String,
      enum: ["pdf-parse", "ocr"],
      required: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;