import { useEffect } from "react";
import { checkHealth } from "./api/resumeApi";
import ResumeDropzone from "./components/upload/ResumeDropzone";

function App() {
  useEffect(() => {
    checkHealth()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div>
      <h1>AI Resume Analyzer</h1>
      <ResumeDropzone />
    </div>
  );
}

export default App;