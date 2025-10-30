import React, { useState } from 'react';

// NOTE: This component requires a Tailwind CSS setup in your project to display styles correctly.

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSend = () => {
    // User ki desired exact command (spelling same rakhi gayi hai: 'Analyais')
    const strictCommand = 'hey ats analyais my resume'; 
    const userInput = inputText.trim().toLowerCase();
    
    // Stop if input is empty or we are already loading
    if (userInput === '' || isLoading) return;

    setIsLoading(true); // Start loading state
    setShowResult(false); // Previous result ko hide karein jab naya command bheja jaa raha ho

    // Simulate an API call delay (replace this setTimeout with your actual API/backend call)
    setTimeout(() => {
      
      if (userInput === strictCommand) {
        // --- 1. EXACT COMMAND MATCHED ---
        setResultText('✅ ATS Analysis Initiated: Your resume is being processed for ATS compatibility.');
        setShowResult(true); // <--- Sirf tabhi result display hoga
      } else {
        // --- 2. NO MATCH ---
        setResultText(''); // Result text ko clear kar dein
        setShowResult(false); // <--- Result Container chhipa rahega
      }

      setInputText(''); // Clear input after processing
      setIsLoading(false); // End loading state
    }, 1200); // 1.2 second simulation delay
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputText.trim() !== '' && !isLoading) {
      handleSend();
    }
  };

  // Button classes for dynamic styling
  const buttonClasses = `
    px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 
    ${inputText.trim() && !isLoading 
      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50' 
      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
    }`;
  
  // Placeholder icon for options/upload
  const PlusIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Search Bar Container */}
      <div className="bg-gray-800 p-3 rounded-xl shadow-2xl border border-gray-700 w-full mb-4">
        <div className="flex items-center space-x-3 w-full">
          
          {/* Options/Attachment Icon */}
          <div className="text-gray-400 cursor-pointer select-none pb-0.5" title="Options/Upload">
            <PlusIcon />
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={isLoading ? "Processing command..." : "Ask anything (Use 'Hey ATS Analyais My Resume')"}
            className="flex-grow bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none py-2 w-full disabled:cursor-not-allowed"
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className={buttonClasses}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              // Simple loading spinner
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

      {/* Result Container - Only displayed when showResult is true */}
      {showResult && (
        <div className="bg-gray-700 text-white p-4 rounded-xl shadow-inner border border-gray-600">
          <p className="font-semibold text-blue-400 mb-2">Response:</p>
          <p className="text-gray-200 whitespace-pre-wrap">{resultText}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;