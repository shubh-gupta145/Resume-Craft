import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
 "/Template image/Template 1.avif",
  "/Template image/Template 2.webp",
  "/Template image/Template 3.avif",
  "/Template image/Template 4.jpg",
  "/Template image/Template 5.jpeg",
  "/Template image/Template 6.png",
  "/Template image/Template 7.avif",
  "/Template image/Template 8.jpeg",
  "/Template image/Template 9.jpg",
  "/Template image/Template 10.avif",
];

function ResumeCarousel() {
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const scrollRight = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 relative overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black text-3xl p-4 rounded-full shadow-lg z-20 hover:scale-110 transition-transform"
      >
        ◀
      </button>

      {/* Carousel */}
      <div className="w-[90vw] overflow-hidden">
        <motion.div
          className="flex flex-row gap-6"
          animate={{ x: `-${index * (240 + 24)}px` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {images.map((src, idx) => (
            <motion.img
              key={idx}
              src={src}
              alt={`Resume ${idx + 1}`}
              className="w-60 h-80 object-cover rounded-xl shadow-lg cursor-pointer flex-shrink-0"
              onClick={() => setSelectedImage(src)}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black text-3xl p-4 rounded-full shadow-lg z-20 hover:scale-110 transition-transform"
      >
        ▶
      </button>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Selected Resume"
              className="max-h-[90%] max-w-[90%] rounded-lg shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ResumeCarousel;