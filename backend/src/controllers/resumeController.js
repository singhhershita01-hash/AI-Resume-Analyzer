import { extractResumeText } from "../services/pdfExtractor.js";
import Resume from "../models/Resume.js";

export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const isPdf =
    req.file.mimetype === "application/pdf" ||
    req.file.originalname.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return res.status(400).json({ error: "Only PDF files are supported" });
  }

  try {
    const { text, method } = await extractResumeText(req.file.path);

    const savedResume = await Resume.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      extractedText: text,
      totalCharacters: text.length,
      extractionMethod: method,
    });

    res.json({
      message: "Resume uploaded, parsed, and saved successfully",
      id: savedResume._id,
      filename: savedResume.filename,
      originalname: savedResume.originalname,
      size: savedResume.size,
      textPreview: savedResume.extractedText.substring(0, 300),
      totalCharacters: savedResume.totalCharacters,
      extractionMethod: savedResume.extractionMethod,
    });
  } catch (err) {
    console.error("Error processing resume:", err);
    res.status(500).json({ error: "Failed to process resume" });
  }
};