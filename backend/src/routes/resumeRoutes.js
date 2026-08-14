import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/resumeController.js";
import { analyzeResume } from "../services/aiAnalyzer.js";
import Resume from "../models/Resume.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/upload", upload.single("resume"), uploadResume);

router.post("/analyze/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    const analysis = await analyzeResume(resume.extractedText);

    resume.analysis = analysis;
    await resume.save();

    res.json({
      message: "Resume analyzed successfully",
      id: resume._id,
      analysis,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

export default router;