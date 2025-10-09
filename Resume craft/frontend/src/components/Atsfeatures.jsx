import { motion } from "framer-motion";
import { ShieldCheck, FileText, Rocket } from "lucide-react";

export default function AtsSection() {
  return (
    <section className="relative bg-gradient-to-r from-[rgb(217,26,118)] via-pink-600 to-indigo-700 text-white py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Resumes optimized for <br />
            <span className="text-yellow-300">Applicant Tracking Systems (ATS)</span>
          </h2>

          <p className="text-gray-100 mb-8 text-lg leading-relaxed">
            Our AI-powered resume templates are tested to pass all major ATS
            scanners. Focus on content, we’ll handle the formatting.
          </p>

          <button className="bg-white text-[rgb(217,26,118)] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
            Build an ATS-Friendly Resume
          </button>
        </motion.div>

        {/* Right Feature Cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md border border-white/20"
          >
            <ShieldCheck className="text-yellow-300 w-10 h-10 mb-4" />
            <h3 className="font-bold text-xl mb-2">Readable Contact Info</h3>
            <p className="text-gray-200 text-sm">
              Structured contact details designed for easy parsing.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md border border-white/20"
          >
            <FileText className="text-yellow-300 w-10 h-10 mb-4" />
            <h3 className="font-bold text-xl mb-2">Experience Section Parsing</h3>
            <p className="text-gray-200 text-sm">
              ATS-friendly formatting ensures complete experience parsing.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md border border-white/20 sm:col-span-2"
          >
            <Rocket className="text-yellow-300 w-10 h-10 mb-4" />
            <h3 className="font-bold text-xl mb-2">Optimized Skills Section</h3>
            <p className="text-gray-200 text-sm">
              Smart sectioning and keyword highlighting to improve ATS ranking.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Circle Glow */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-10 -left-10 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl"></div>
    </section>
  );
}
