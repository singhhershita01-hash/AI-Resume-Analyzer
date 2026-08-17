import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadResume, analyzeResume } from "../../api/resumeApi";
import ATSScoreCard from "../dashboard/ATSScoreCard";
import Loader from "../common/Loader";
import ErrorBanner from "../common/ErrorBanner";

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
    <div className="max-w-2xl mx-auto px-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${isDragActive ? "bg-gray-800 border-emerald-500" : "border-gray-600"
          }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-300">Drop the PDF here...</p>
        ) : (
          <p className="text-gray-400">
            Drag & drop your resume PDF here, or click to select
          </p>
        )}
      </div>

      {uploading && <p className="text-gray-400 mt-4">Uploading...</p>}
      {error && (
        <ErrorBanner
          message={error}
          onRetry={result ? handleAnalyze : undefined}
        />
      )}
      {result && !analysis && !analyzing && (
        <div className="mt-6">
          <p className="text-emerald-400">
            Uploaded: {result.originalname} ({result.size} bytes)
          </p>
          <button
            onClick={handleAnalyze}
            className="mt-3 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded"
          >
            Analyze Resume
          </button>
        </div>
      )}

      {analyzing && <Loader />}

      {analysis && !analyzing && (
        <div className="mt-6 text-left">
          <ATSScoreCard analysis={analysis} />
        </div>
      )}
    </div>
  );
}