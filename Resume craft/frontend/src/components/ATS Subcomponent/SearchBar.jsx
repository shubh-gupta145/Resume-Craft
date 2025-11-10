import React, { useState, useRef } from "react";
import axios from "axios";

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null); // 👈 ref for hidden file input

  const handleChange = (event) => setInputText(event.target.value);

  const handleSend = () => {
    const strictCommand = "hey ats analayis my resume";
    const userInput = inputText.trim().toLowerCase();

    if (userInput === "" || isLoading) return;

    setIsLoading(true);
    setShowResult(false);

    setTimeout(() => {
      if (userInput === strictCommand) {
        setResultText("📄 Please upload your resume (PDF) for ATS analysis.");
        setShowResult(true);

        // 👇 Automatically trigger file picker
        if (fileInputRef.current) fileInputRef.current.click();
        else console.error("File input ref not found");
      } else {
        setResultText(
          "⚠️ Command not recognized. Please type exactly: 'Hey ATS Analayis My Resume'"
        );
        setShowResult(true);
      }

      setInputText("");
      setIsLoading(false);
    }, 1000);
  };

  // 👇 Handle file upload and send to backend
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription","React.js  developer skilled in html,css,javascript");

    try {
      setIsLoading(true);
      setResultText("⏳ Uploading and analyzing your resume...");
      setShowResult(true);
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/api/v1/atsScore", formData, {
        headers: { "Content-Type": "multipart/form-data","Authorization": `Bearer ${token}`},
      });

      // ✅ Display formatted ATS analysis
      setResultText(`
✅ Analysis Complete:

👤 Name: ${res.data.name || "Not detected"}
📧 Email: ${res.data.email || "Not found"}
📞 Phone: ${res.data.phone || "Not found"}

📝 Summary:
${res.data.summary || "No summary detected."}

💡 Skills:
${res.data.skills?.join(", ") || "Not found"}

🏆 ATS Score: ${res.data.atsScore || "N/A"}
      `);
    } catch (err) {
      console.error(err);
      setResultText("❌ Error analyzing the resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputText.trim() !== "" && !isLoading) handleSend();
  };

  const buttonClasses = `
    px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 
    ${inputText.trim() && !isLoading
      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50"
      : "bg-gray-700 text-gray-400 cursor-not-allowed"
    }`;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-800 p-3 rounded-xl shadow-2xl border border-gray-700 w-full mb-4">
        <div className="flex items-center space-x-3 w-full">
          
          {/* 🆕 Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* '+' Icon */}
          <button
            type="button"
            title="Upload Resume"
            onClick={() => {
              console.log("Plus icon clicked");
              if (fileInputRef.current) fileInputRef.current.click();
              else console.error("File input ref not found");
            }}
            className="text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>

          {/* Input Field */}
          <input
            type="text"
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={
              isLoading
                ? "Processing..."
                : "Ask anything (Use 'Hey ATS Analayis My Resume')"
            }
            className="flex-grow bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none py-2 w-full disabled:cursor-not-allowed"
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className={buttonClasses}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? "Processing..." : "Send"}
          </button>
        </div>
      </div>

      {/* Result Display */}
      {showResult && (
        <div className="bg-gray-700 text-white p-4 rounded-xl shadow-inner border border-gray-600 whitespace-pre-wrap">
          {resultText}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
