import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "First Select your job profession (Only IT sector for now)",
    description:
      "Build your resume — we’ll guide you every step of the way to ensure it’s professional and polished.",
    image: "Job.png",
  },
  {
    id: 2,
    title: "Now Upload Your Resume File",
    description:
      "After doing the first step, upload your existing resume to our platform for analysis.",
    image: "Upload.png",
  },
  {
    id: 3,
    title: "Result Details",
    description:
      "This result container contain few details like ATS Score, Keyword, Suggestion etc.",
    image: "Result.png",
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
            {/* ✅ Image Section (Smaller Size) */}
            <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-[30%] flex justify-center">
              <img
                src={step.image}
                alt={step.title}
                className="rounded-lg w-[70%] h-auto object-contain"
              />
            </div>

            {/* ✅ Text Section */}
            <div className="w-full md:w-[55%] text-center md:text-left">
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
