import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Free Online Resume Builder",
    subtitle: "Build your professional resume in minutes",
    button: "Build my resume",
    link: "/template", // 👈 when clicked, open template page
    img: "https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_1280.jpg",
  },
  {
    title: "View The Resume Examples",
    subtitle: "All The Resume Are ATS Friendly and Support To Make The Good Resume For JOB",
    button: "Resume Examples",
    link: "/resume_example",
    img: "/Template image/Template 3.avif",
  },
  {
    title: "View Our Template",
    subtitle: "CheckOut Our ATS Friendly Template With colorFull Text and Awesome Background",
    button: "View Our Templates",
    link: "/", // 👈 if you have ATS page
    img: "https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((current - 1 + slides.length) % slides.length);

  // Optional: Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 overflow-hidden">
      <div className="relative w-full max-w-7xl flex items-center justify-center px-10">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full shadow-lg p-5 z-20 transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-12 p-14 rounded-3xl bg-white shadow-xl w-full"
          >
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {slides[current].title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {slides[current].subtitle}
              </p>

              {/* ✅ Routing button */}
              <Link to={slides[current].link}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-fuchsia-500 hover:to-purple-600"
                >
                  {slides[current].button}
                </motion.button>
              </Link>
            </div>

            <motion.div
              className="flex-1 flex justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={slides[current].img}
                alt="Resume Preview"
                className="rounded-2xl shadow-lg w-[500px] h-[400px]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full shadow-lg p-5 z-20 transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex gap-2 mt-6">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-purple-600" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
