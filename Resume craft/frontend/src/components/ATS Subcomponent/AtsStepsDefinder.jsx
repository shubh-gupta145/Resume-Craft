import React from "react";
import { motion } from "framer-motion";
import CopyCodeBlock from "./copypaste";

const steps = [
  {
    id: 1,
    title: "First Select your job profession (Only IT sector for now)",
    description:
      "Build your resume — we’ll guide you every step of the way to ensure it’s professional and polished.",
    image: "/images/select-profession.png", // 🔹 replace with your own image path
  },
  {
    id: 2,
    title: "Now Upload Your Resume File",
    description:
      "After doing the first step, upload your existing resume to our platform for analysis.",
    image: "/images/upload-resume.png", // 🔹 replace with your own image path
  },
  {
    id: 3,
    title: "Copy paste this command",
    description:
      "Use our AI-powered tools to optimize your resume for ATS and improve your chances of getting noticed by employers.",
  },
];

 function HowAtsWork() {
  return (
    <section className="bg-[#f5f2f0] py-20">
      <h2 className="text-center text-4xl font-extrabold text-[#1b103b] mb-16">
        How Our ATS WORK
      </h2>

      <div className="max-w-6xl mx-auto space-y-20 px-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* ✅ Left/Right Section (Image or Code) */}
            <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-1/2 flex justify-center">
              {step.id === 3 ? (
                <CopyCodeBlock />
              ) : (
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-lg w-full h-auto object-contain"
                />
              )}
            </div>

            {/* ✅ Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#1b103b] mb-2">
                {step.id}. {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowAtsWork;
