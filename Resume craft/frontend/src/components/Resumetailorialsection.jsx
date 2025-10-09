import React from "react";
import { motion } from "framer-motion";

export default function ResumeTailoringSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-indigo-50 via-white to-pink-50 flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center md:items-start"
      >
        {/* Profile Image */}
        <img
          src="/images/profile2.png" // replace with your actual image
          alt="Profile"
          className="rounded-full w-32 h-32 border-4 border-pink-500 shadow-lg"
        />

        {/* Floating Resume Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative mt-8"
        >
          <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xs">
            <h4 className="text-lg font-semibold text-gray-800">
              Job Description:
            </h4>
            <p className="text-gray-500 text-sm mt-2">
              Quickly match your resume with the job requirements.
            </p>
            <button className="mt-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition">
              Apply
            </button>
          </div>

          {/* Floating Tags */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -right-10 top-1/2 bg-white shadow-lg rounded-xl p-3"
          >
            <ul className="space-y-2">
              {["Google", "Dell", "Spotify", "Tesla"].map((company) => (
                <li
                  key={company}
                  className="bg-gradient-to-r from-pink-400 to-indigo-400 text-white px-3 py-1 rounded-md text-sm font-medium"
                >
                  {company}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mt-12 md:mt-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
          Resume tailoring based on the job you’re applying for
        </h2>
        <p className="text-gray-600 mb-6">
          Ensure that your resume highlights key skills and experiences by
          analyzing and adapting it for each job.
        </p>

        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center gap-2">
            ✅ Skills and experience section analysis
          </li>
          <li className="flex items-center gap-2">
            ✅ Actionable checklist to improve your resume
          </li>
          <li className="flex items-center gap-2">
            ✅ Instant comparison with job descriptions
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
