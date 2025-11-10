import { motion } from "framer-motion";

const resumeData = [
  {
    id: 1,
    img: "/resumeexampleimages/example1.jpg",
    title: "Modern Professional Resume",
    desc: "A clean and ATS-optimized layout for corporate and software roles with elegant typography.",
  },
  {
    id: 2,
    img: "/resumeexampleimages/example2.jpg",
    title: "Creative Designer Resume",
    desc: "Stylish and colorful design ideal for graphic designers and creative professionals.",
  },
  {
    id: 3,
    img: "/resumeexampleimages/example3.jpg",
    title: "Minimal Elegant Resume",
    desc: "Soft color tones and simple structure that highlight your experience beautifully.",
  },
  {
    id: 4,
    img: "/resumeexampleimages/example4.jpg",
    title: "Bold and Impactful Resume",
    desc: "Eye-catching layout with bold headers and sharp contrast — perfect for leadership roles.",
  },
  {
    id: 5,
    img: "/resumeexampleimages/example5.jpg",
    title: "Simple Classic Resume",
    desc: "Professional and neat resume layout ideal for freshers and formal job applications.",
  },
];

export default function ResumeExamples() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-16 px-6 md:px-20">
      {/* Header Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16"
      >
        Resume{" "}
        <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
          Examples
        </span>
      </motion.h1>

      {/* Resume Cards */}
      <div className="space-y-24">
        {resumeData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <motion.img
              src={item.img}
              alt={item.title}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="w-full md:w-[420px] h-auto rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-shadow duration-500"
            />

            {/* TEXT */}
            <motion.div
              initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 text-center md:text-left space-y-4"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-blue-400 transition-all duration-500">
                {item.title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Explore Templates Button */}
      <div className="flex justify-center mt-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white text-gray-900 font-semibold text-lg rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-400 hover:text-white transition-all duration-500"
        >
          Explore Templates →
        </motion.button>
      </div>
    </div>
  );
}
