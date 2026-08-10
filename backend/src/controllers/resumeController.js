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

  res.json({
    message: "Resume uploaded successfully",
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
  });
};