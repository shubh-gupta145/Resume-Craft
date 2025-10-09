import React from "react";
import { motion } from "framer-motion";

export default function GrammarCheckSection() {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-pink-100 via-white to-indigo-100 flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Check your resume for grammatical and punctuation errors
        </h2>
        <p className="text-gray-600 mb-6">
          A built-in content checker tool helps you stay on top of grammar
          errors and clichés.
        </p>

        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center gap-2">
            ✅ Wording and readability analysis
          </li>
          <li className="flex items-center gap-2">
            ✅ Eliminate typos and grammatical errors
          </li>
          <li className="flex items-center gap-2">
            ✅ Smart suggestions based on your experience
          </li>
        </ul>
      </motion.div>

      {/* Right Image + Card Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative mt-10 md:mt-0"
      >
        <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-xs md:max-w-sm">
          <img
            src="/images/profile-sample.png" // replace with your image
            alt="Profile Preview"
            className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-pink-400"
          />
          <h4 className="text-center font-semibold text-gray-700">JENICA</h4>
          <p className="text-center text-sm text-gray-500">
            SOLUTIONS ENGINEER
          </p>
        </div>

        {/* Floating Card */}
        <motion.div
          className="absolute top-12 -right-6 bg-white shadow-lg p-3 rounded-xl border border-gray-200"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <p className="text-sm text-gray-600">
            ✨ Did you mean <span className="text-green-600 font-semibold">“improved”</span>?
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
