import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeResume = async (resumeText) => {
  const prompt = `
You are an ATS (Applicant Tracking System) resume analyzer. Analyze the following resume text and return ONLY a valid JSON object — no markdown formatting, no code fences, no explanation text before or after.

The JSON must follow this exact structure:
{
  "atsScore": <number 0-100>,
  "scoreBreakdown": {
    "formatting": <number 0-25>,
    "keywords": <number 0-25>,
    "sectionCompleteness": <number 0-25>,
    "readability": <number 0-25>
  },
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "suggestedRoles": ["<role 1>", "<role 2>"],
  "missingKeywords": ["<keyword 1>", "<keyword 2>"]
}

Note: the four scoreBreakdown values must sum to exactly atsScore.

Resume text:
"""
${resumeText}
"""
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  let rawText = response.text.trim();

  // Gemini sometimes wraps JSON in ```json fences despite instructions — strip if present
  rawText = rawText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();

  try {
    return JSON.parse(rawText);
  } catch (err) {
    console.error("Failed to parse Gemini response as JSON:", rawText);
    throw new Error("AI returned invalid JSON format");
  }
};