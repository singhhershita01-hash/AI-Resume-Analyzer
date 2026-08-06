import { useEffect } from "react";
import { checkHealth } from "./api/resumeApi";

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
    </div>
  );
}

export default App;