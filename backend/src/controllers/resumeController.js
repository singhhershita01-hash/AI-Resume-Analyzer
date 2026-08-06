export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({ error: "Only PDF files are supported" });
  }

  res.json({
    filename: req.file.filename,
    size: req.file.size,
  });
};