import fs from "fs";
import { PDFParse } from "pdf-parse";
import { pdf } from "pdf-to-img";
import { createWorker } from "tesseract.js";

const MIN_TEXT_LENGTH = 50;

export const extractTextFromPdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: dataBuffer });
  const parsed = await parser.getText();
  await parser.destroy();
  return parsed.text;
};

export const needsOcr = (extractedText) => {
  return extractedText.trim().length < MIN_TEXT_LENGTH;
};

export const convertPdfToImages = async (filePath) => {
  const document = await pdf(filePath, { scale: 2 });
  const imagePaths = [];
  let pageNum = 1;

  for await (const image of document) {
    const imagePath = `uploads/page-${pageNum}-${Date.now()}.png`;
    fs.writeFileSync(imagePath, image);
    imagePaths.push(imagePath);
    pageNum++;
  }

  return imagePaths;
};

export const extractTextWithOcr = async (imagePaths) => {
  const worker = await createWorker("eng");
  let fullText = "";

  for (const imagePath of imagePaths) {
    const { data } = await worker.recognize(imagePath);
    fullText += data.text + "\n";
  }

  await worker.terminate();

  // clean up temp page images after OCR
  imagePaths.forEach((p) => fs.unlinkSync(p));

  return fullText;
};

const cleanText = (text) => {
  return text
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
};

export const extractResumeText = async (filePath) => {
  const nativeText = await extractTextFromPdf(filePath);

  if (!needsOcr(nativeText)) {
    return { text: cleanText(nativeText), method: "pdf-parse" };
  }

  const imagePaths = await convertPdfToImages(filePath);
  const ocrText = await extractTextWithOcr(imagePaths);
  return { text: cleanText(ocrText), method: "ocr" };
};