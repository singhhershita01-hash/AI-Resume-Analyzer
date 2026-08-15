import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadResume, analyzeResume } from "../../api/resumeApi";

export default function ResumeDropzone() {
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);
    setAnalysis(null);

    try {
      const data = await uploadResume(file);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!result?.id) return;
    setAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeResume(result.id);
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.response?.data?.error || "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
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

      {result && !analysis && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ color: "green" }}>
            Uploaded: {result.originalname} ({result.size} bytes)
          </p>
          <button onClick={handleAnalyze} disabled={analyzing}>
            {analyzing ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      )}

      {analysis && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h2>ATS Score: {analysis.atsScore}/100</h2>
          <p>{analysis.summary}</p>

          <h3>Strengths</h3>
          <ul>
            {analysis.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3>Weaknesses</h3>
          <ul>
            {analysis.weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>

          <h3>Suggested Roles</h3>
          <ul>
            {analysis.suggestedRoles.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          <h3>Missing Keywords</h3>
          <ul>
            {analysis.missingKeywords.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}