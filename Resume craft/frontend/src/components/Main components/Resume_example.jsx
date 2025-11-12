import { motion } from "framer-motion";
import Footer from "../Home Subcomponent/Footer";

const resumeData = [
  {
    id: 1,
    img: "/resumeexampleimages/example1.jpg",
    title: "Modern Professional Resume",
    desc: "This resume example demonstrates a perfect balance between design and professionalism. It includes all essential sections like profile, work experience, education, and skills in a clean, two-column layout with elegant color combinations. The use of icons and progress bars makes it both visually appealing and easy to understand",
  },
  {
    id: 2,
    img: "/resumeexampleimages/example2.jpg",
    title: "Creative Designer Resume",
    desc: "This resume example showcases a creative and modern design suitable for graphic designers and marketing professionals. It features a clean structure, bold typography, and a professional color scheme that balances creativity and readability. The timeline-style experience, visual skill indicators, and prominent photo section make it stand out as an excellent example of a professional yet artistic resume.",
  },
  {
    id: 3,
    img: "/resumeexampleimages/example3.jpg",
    title: "Minimal Elegant Resume",
    desc: "This resume example showcases a minimalist and professional layout ideal for creative professionals. With a clear two-column structure, balanced typography, and blue accents, it effectively presents personal details, experience, education, and skills. The use of visual indicators for skills and languages makes it modern, elegant, and recruiter-friendly.",
  },
  {
    id: 4,
    img: "/resumeexampleimages/example4.jpg",
    title: "Bold and Impactful Resume",
    desc: "This resume example features a bold and futuristic design ideal for creative professionals. With a large title, striking color palette, and clean typography, it combines modern aesthetics with simplicity. The balanced use of imagery, minimal text, and creative layout makes it stand out as a stylish and professional resume template.",
  },
  {
    id: 5,
    img: "/resumeexampleimages/example5.jpg",
    title: "Simple Classic Resume",
    desc: "This resume example features a clean, elegant layout with a calm color palette and balanced typography. It presents all key sections—profile, education, experience, skills, and hobbies—in a well-structured format. The minimalistic yet classy design makes it ideal for professionals who want a stylish and easy-to-read resume.",
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
      <Footer></Footer>
    </div>
  );
}
