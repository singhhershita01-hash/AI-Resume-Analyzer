import fs from "fs";
import { PDFParse } from "pdf-parse";
import { pdf } from "pdf-to-img";
import { createWorker } from "tesseract.js";
import Resume from "../models/Resume.js";

const MIN_TEXT_LENGTH = 50; // if extracted text is shorter than this, assume it's a scanned PDF

const extractTextWithOCR = async (filePath) => {
  const document = await pdf(filePath, { scale: 2 });
  const worker = await createWorker("eng");

  let fullText = "";
  for await (const image of document) {
    const { data } = await worker.recognize(image);
    fullText += data.text + "\n";
  }

  await worker.terminate();
  return fullText;
};

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
    const dataBuffer = fs.readFileSync(req.file.path);
    const parser = new PDFParse({ data: dataBuffer });
    const parsed = await parser.getText();
    await parser.destroy();

    let extractedText = parsed.text;
    let usedOCR = false;

    if (extractedText.trim().length < MIN_TEXT_LENGTH) {
      console.log("Text too short, falling back to OCR...");
      extractedText = await extractTextWithOCR(req.file.path);
      usedOCR = true;
    }

    const savedResume = await Resume.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      extractedText,
      totalCharacters: extractedText.length,
    });

    res.json({
      message: "Resume uploaded, parsed, and saved successfully",
      id: savedResume._id,
      filename: savedResume.filename,
      originalname: savedResume.originalname,
      size: savedResume.size,
      textPreview: savedResume.extractedText.substring(0, 300),
      totalCharacters: savedResume.totalCharacters,
      usedOCR,
    });
  } catch (err) {
    console.error("Error processing resume:", err);
    res.status(500).json({ error: "Failed to process resume" });
  }
};