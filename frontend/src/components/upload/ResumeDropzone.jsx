import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadResume } from "../../api/resumeApi";

export default function ResumeDropzone() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const data = await uploadResume(file);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #999",
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragActive ? "#f0f0f0" : "#fff",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the PDF here...</p>
        ) : (
          <p>Drag & drop your resume PDF here, or click to select</p>
        )}
      </div>

      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <p style={{ color: "green" }}>
          Uploaded: {result.originalname} ({result.size} bytes)
        </p>
      )}
    </div>
  );
}