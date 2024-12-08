// Frontend Code
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import custom styles

function App() {
  const [objectCount, setObjectCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setObjectCount(response.data.object_count);
    } catch (error) {
      setError("Error uploading file. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Object Detection Dashboard</h1>
        <p>
          Upload a video to detect and count objects using the YOLO (You Only
          Look Once) algorithm.
        </p>
        <input type="file" accept="video/*" onChange={handleFileUpload} />
        {loading && <p className="loading">Processing your video...</p>}
        {error && <p className="error">{error}</p>}
        {objectCount !== null && (
          <p className="result">Objects Detected: {objectCount}</p>
        )}
        <section className="info">
          <h2>How It Works</h2>
          <p>
            This application uses the YOLO algorithm to detect objects in
            videos. YOLO is a real-time object detection system that identifies
            objects in video frames and counts them efficiently.
          </p>
          <p>
            The uploaded video is processed frame by frame, and objects are
            detected using pre-trained weights on the COCO dataset.
          </p>
        </section>
      </header>
    </div>
  );
}

export default App;
