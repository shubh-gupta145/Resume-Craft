import React, { useState } from 'react';

const Result = () => {
  const [inputText, setInputText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSend = () => {
    // 🔑 UPDATED COMMAND: 'hey ats analyais my resume' (lowercase for comparison)
    const strictCommand = 'hey ats analyais my resume';
    
    // Get user input, trim spaces, and convert to lowercase for robust matching
    const userInput = inputText.trim().toLowerCase();

    // Prevent execution if input is empty or a command is already loading
    if (userInput === '' || isLoading) return;

    setIsLoading(true);
    setShowResult(false); // Hide any previous result before starting new process

    // Simulate API delay
    setTimeout(() => {
      
      // Strict check for the new command
      if (userInput === strictCommand) {
        const analysisResult = `
✅ Analysis Complete: Your resume is 78% ATS Compliant.

Summary:
- Keywords: 9/10 (Excellent match for a Software Engineer role.)
- Formatting: Good (Standard bullet points used.)
- Contact Info: Missing LinkedIn URL.

Suggestion: Add a brief, impactful professional summary section at the top.
        `;
        setResultText(analysisResult.trim());
        setShowResult(true);
      } else {
        // Updated error message to show the new command (with proper capitalization for display)
        setResultText('⚠️ Command not recognized. Please type the command EXACTLY: "Hey ATS Analyais My Resume"');
        setShowResult(true);
      }

      setInputText('');
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputText.trim() !== '' && !isLoading) {
      handleSend();
    }
  };

  const buttonClasses = `
    px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
    ${inputText.trim() && !isLoading
      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
    }`;

  const PlusIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Search Bar Container */}
      <div className="bg-gray-800 p-3 rounded-xl shadow-2xl border border-gray-700 w-full mb-6">
        <div className="flex items-center space-x-3 w-full">

          <div className="text-gray-400 cursor-pointer select-none pb-0.5" title="Options/Upload">
            <PlusIcon />
          </div>

          <input
            type="text"
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            // Updated placeholder text
            placeholder={isLoading ? "Processing command..." : "Ask anything (Use 'Hey ATS Analyais My Resume')"}
            className="flex-grow bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none py-2 w-full disabled:cursor-not-allowed"
            disabled={isLoading}
          />

          <button
            onClick={handleSend}
            className={buttonClasses}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>

      {/* --- CENTERED MODAL RESULT CONTAINER --- */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative max-w-3xl w-11/12 p-8 rounded-3xl bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-2xl transform transition-all duration-700 scale-95 animate-fade-in">

            {/* Close Button - 🔑 Essential for dismissing the modal (both success and failure) */}
            <button
              onClick={() => setShowResult(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center mb-6">
              <svg
                className="w-7 h-7 text-blue-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6m2 7H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-3xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                ATS Analysis Result
              </h2>
            </div>

            {/* Result content */}
            <pre className="text-gray-200 text-lg font-sans leading-relaxed whitespace-pre-wrap p-5 rounded-xl bg-gray-800 bg-opacity-50 max-h-[70vh] overflow-y-auto">
              {resultText}
            </pre>

            {/* Footer / Suggestion */}
            <p className="mt-6 text-sm text-gray-400 italic">
              💡 Tip: Highlight key skills and ensure all contact info is included.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;