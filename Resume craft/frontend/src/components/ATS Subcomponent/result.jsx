import React, { useState, useRef } from 'react';
import axios from 'axios';

const Result = () => {
  const [inputText, setInputText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [jobProfile, setJobProfile] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (event) => setInputText(event.target.value);

  const handleSend = async () => {
    if (isLoading || inputText.trim() === '') return;
    setIsLoading(true);
    setShowResult(false);

    // 🧩 Step 1: Choose Job Profile
    if (step === 1) {
      setJobProfile(inputText.trim());
      setInputText('');
      setIsLoading(false);
      setStep(2);
      return;
    }

    // 🧩 Step 2: Trigger Resume Upload
    if (step === 2) {
      fileInputRef.current.click();
      setInputText('');
      setIsLoading(false);
      return;
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobProfile', jobProfile);

    try {
      setIsLoading(true);
      setResultText('⏳ Analyzing your resume...');
      setShowResult(true);
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:3000/api/v1/atsScore', formData, {
        headers: { 'Content-Type': 'multipart/form-data',"Authorization": `Bearer ${token}`},
      });

      setResultText(`
      ✅ Analysis Complete for Job Profile: ${jobProfile}
      Name: ${res.data.name}
      Email: ${res.data.email}
      Phone: ${res.data.phone}


      ATS Score: ${res.data.atsScore || 'N/A'}
      `);

      setStep(2);
    } catch (err) {
      console.error(err);
      const backendMessage = err.response?.data?.message || "Unknown error occurred";
      setResultText(`❌ Error analyzing the resume. Please try again.\nReason: ${backendMessage}`);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputText.trim() !== '' && !isLoading) handleSend();
  };

  const getPlaceholder = () => {
    if (step === 1) return 'First Choose Your Job Profile';
    if (step === 2) return 'Please Submit Your Resume';
    return 'Type something...';
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Search Bar */}
      <div className="bg-gray-800 p-3 rounded-xl shadow-2xl border border-gray-700 w-full mb-6">
        <div className="flex items-center space-x-3 w-full">
          {/* Hidden File Input */}
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
            className="text-gray-400 cursor-pointer pb-0.5 relative z-50"
            title="Upload Resume"
            onClick={() => {
              if (fileInputRef.current && step === 2) {
                fileInputRef.current.click();
              }
            }}
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-white transition"
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

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={isLoading ? "Processing..." : getPlaceholder()}
            className="flex-grow bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none py-2 w-full disabled:cursor-not-allowed"
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              inputText.trim() && !isLoading
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? "Processing..." : "Send"}
          </button>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative max-w-3xl w-11/12 p-8 rounded-3xl bg-gray-900 bg-opacity-90 shadow-2xl">
            <button
              onClick={() => setShowResult(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
              ATS Analysis Result
            </h2>

            <pre className="text-gray-200 text-lg whitespace-pre-wrap max-h-[70vh] overflow-y-auto">
              {resultText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
