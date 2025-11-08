import { motion } from "framer-motion";
import Footer from "../Home Subcomponent/Footer";

const resumeExamples = [
  {
    id: 1,
    title: "Software Engineer Resume",
    desc: "A clean, ATS-optimized layout for developers and tech professionals, highlighting skills, projects, and achievements.",
    img: "/public/images/resume1.jpg",
  },
  {
    id: 2,
    title: "Graphic Designer Resume",
    desc: "A creative layout with a modern touch, ideal for showcasing visual skills and artistic achievements.",
    img: "/images/resume2.jpg",
  },
  {
    id: 3,
    title: "Marketing Manager Resume",
    desc: "Professional and persuasive, perfect for marketing professionals aiming to stand out with data-backed results.",
    img: "/images/resume3.jpg",
  },
  {
    id: 4,
    title: "Data Analyst Resume",
    desc: "Minimal and organized, focusing on analytics tools, insights, and measurable impact.",
    img: "/images/resume4.jpg",
  },
  {
    id: 5,
    title: "Teacher Resume",
    desc: "Warm and approachable design highlighting communication, teaching experience, and educational background.",
    img: "/images/resume5.jpg",
  },
  {
    id: 6,
    title: "Finance Executive Resume",
    desc: "Elegant and professional layout optimized for corporate professionals and analysts.",
    img: "/images/resume6.jpg",
  },
  {
    id: 7,
    title: "Content Writer Resume",
    desc: "Creative yet structured design for copywriters and journalists, emphasizing tone and writing samples.",
    img: "/images/resume7.jpg",
  },
  {
    id: 8,
    title: "Human Resource Resume",
    desc: "A people-focused design highlighting communication, team management, and leadership strengths.",
    img: "/images/resume8.jpg",
  },
  {
    id: 9,
    title: "Civil Engineer Resume",
    desc: "Technical layout suitable for engineering and construction roles, focusing on projects and site experience.",
    img: "/images/resume9.jpg",
  },
  {
    id: 10,
    title: "UI/UX Designer Resume",
    desc: "Modern gradient style highlighting user-centered design principles and portfolio links.",
    img: "/images/resume10.jpg",
  },
];

const ResumeExamples = () => {
  return (
    <>
    <section className="bg-gradient-to-b from-white via-pink-50 to-indigo-50 py-20 px-6 md:px-16">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-[rgb(217,26,118)] mb-16"
      >
        Explore 10 Professionally Designed Resume Templates
      </motion.h1>

      <div className="flex flex-col gap-24">
        {resumeExamples.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center justify-between gap-10 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-full md:w-1/2 relative"
            >
              <img
                src={item.img}
                alt={item.title}
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-600/10 to-transparent" />
            </motion.div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
                {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {item.desc}
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="bg-[rgb(217,26,118)] text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-pink-700 transition-all duration-300"
              >
                View Template
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
    <Footer></Footer>
    </>
  );
};

export default ResumeExamples;
