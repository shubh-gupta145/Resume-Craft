import React, { useState } from "react";
import { motion } from "framer-motion";

function CopyCodeBlock() {
  const [copied, setCopied] = useState(false);
  const command = " Hey ATS Analayis My Resume";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 p-6">
      <motion.div
        className="bg-[#1e1e1e] rounded-lg shadow-md text-gray-100 px-4 py-3 flex items-center justify-between w-[380px] md:w-[500px]"
        whileHover={{ scale: 1.02 }}
      >
        <pre className="text-[#d29bff] font-mono text-sm overflow-x-auto">
          Hey ATS  <span className="text-sky-400">Analayis</span>{" "}
          <span className="text-sky-400">My Resume</span>
        </pre>

        <button
          onClick={handleCopy}
          className="ml-3 bg-gray-800 hover:bg-gray-700 text-xs px-3 py-1.5 rounded-md transition-all duration-300"
        >
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
      </motion.div>
    </div>
  );
}
export default CopyCodeBlock;