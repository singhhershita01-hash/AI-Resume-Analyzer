import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const checkHealth = () => {
  return api.get("/health").then((res) => res.data);
};

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return api.post("/api/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => res.data);
};

export const analyzeResume = (resumeId) => {
  return api.post(`/api/resume/analyze/${resumeId}`).then((res) => res.data);
};