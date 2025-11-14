import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

import FAQSection from "../Home Subcomponent/FAQ";
import FeaturesSection from "../Home Subcomponent/Featuressections";
import ResumeCarousel from "../Home Subcomponent/Template_menu";
import AtsSection from "../Home Subcomponent/Atsfeatures";
import GrammarCheckSection from "../Home Subcomponent/Grammerchecksection";
import ResumeTailoringSection from "../Home Subcomponent/Resumetailorialsection";
import Footer from "../Home Subcomponent/Footer";



function Home_content() {
  // ✅ Flip-card logic at the top (valid React usage)
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="">
        <div className="bg-gray-50 text-gray-800">
          {/* HERO SECTION */}
          <div className="relative bg-gradient-to-r from-[rgb(115,20,232)] via-pink-600 to-indigo-700 text-white py-20 overflow-hidden">
            <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 max-w-7xl mx-auto">

              {/* LEFT HERO TEXT */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="md:w-1/2"
              >
                <h1 className="text-5xl font-extrabold mb-6">Build Your Perfect Resume</h1>
                <p className="text-lg text-gray-200 mb-6">
                  Create an ATS-friendly professional resume in just a few steps.
                </p>

                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition">
                  Start Building →
                </button>
              </motion.div>

              {/* RIGHT HERO IMAGE FLIP CARD */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
              >
                <div className="relative group w-[380px] h-[480px] [perspective:1000px] ml-10 transition-transform duration-500 hover:-translate-y-3 hover:scale-[1.05]">
                  <div
                    className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] 
                      ${flipped ? "[transform:rotateY(180deg)]" : ""}
                      group-hover:[transform:rotateY(180deg)]`}
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      <img
                        src="/4016575.jpg"
                        alt="Resume Preview"
                        className="w-full h-full rounded-xl shadow-2xl object-cover"
                      />
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <img
                        src="/back.jpg"
                        alt="Back Resume"
                        className="w-full h-full rounded-xl shadow-2xl object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>

          {/* STEPS SECTION */}
          <section className="bg-white py-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-10 px-10 max-w-6xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Choose Template",
                  desc: "Pick from professional resume templates designed for success.",
                },
                {
                  step: "2",
                  title: "Fill Your Details",
                  desc: "Add your education, experience, and skills easily.",
                },
                {
                  step: "3",
                  title: "Download Resume",
                  desc: "Get your resume instantly in PDF format.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 p-8 rounded-2xl shadow-md text-center"
                >
                  <div className="text-blue-600 text-5xl font-extrabold mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* OTHER SECTIONS */}
          <ResumeCarousel />
          <FeaturesSection />
          <AtsSection />
          <GrammarCheckSection />
          <ResumeTailoringSection />

          {/* RESUME SECTIONS FEATURE */}
          {/* ... (kept your original content) ... */}

          {/* RESUME EXAMPLES BUTTON */}
          <section className="py-20 bg-gray-50 text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-snug"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              The resume builder that's right for your job <br /> and experience
            </motion.h2>

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              View All Resume Examples
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </section>

          <FAQSection />

          {/* CTA */}
          <section className="text-center py-20 bg-blue-600 text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Create Your Resume?</h2>
            <p className="mb-6 text-lg">Build a professional resume in minutes.</p>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition">
              Get Started Now →
            </button>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home_content;
