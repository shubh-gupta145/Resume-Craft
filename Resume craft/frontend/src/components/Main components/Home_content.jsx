import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FAQSection from "../Home Subcomponent/FAQ";
import FeaturesSection from "../Home Subcomponent/Featuressections";
import ResumeCarousel from "../Home Subcomponent/Template_menu";
import AtsSection from "../Home Subcomponent/Atsfeatures";
import GrammarCheckSection from "../Home Subcomponent/Grammerchecksection";
import ResumeTailoringSection from "../Home Subcomponent/Resumetailorialsection";
function Home_content(){
    return(
<>
      <div className="">
        <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[rgb(115,20,232)] via-pink-600 to-indigo-700 text-white py-20 overflow-hidden">
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <h1 className="text-5xl font-extrabold text mb-6">
            Build Your Perfect Resume
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Create an ATS-friendly professional resume in just a few steps. 
            Choose a template, fill in your details, and download instantly.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition">
            Start Building →
          </button>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mt-10 md:mt-0"
        >
          <img
            src="\templates pictures\ChatGPT Image Sep 28, 2025, 01_45_28 AM.png"
            alt="Resume Preview"
            className="rounded-2xl shadow-xl"
          />
        </motion.div>
      </section>
      </div>

      {/* Steps Section */}
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
              <div className="text-blue-600 text-5xl font-extrabold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates Section */}
         <ResumeCarousel></ResumeCarousel>
      <FeaturesSection></FeaturesSection>
      <AtsSection></AtsSection>

      <GrammarCheckSection></GrammarCheckSection>

      <ResumeTailoringSection></ResumeTailoringSection>

      //20+ resume example section 

      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-white via-blue-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            20+ Professionally designed <br /> 
            <span className="text-blue-600">resume sections</span>
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Express your professional history without limitations or worry about how your resume looks.
          </p>

          <ul className="space-y-4 text-gray-800">
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✔</span>
              Professional sections like <b>Experience, Skills, Summary</b> and <b>Education</b>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✔</span>
              Personal sections like <b>Strengths, Quotes, Interests</b> and <b>My Time</b>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✔</span>
              Other sections like <b>Certifications, Awards, Languages</b> and <b>References</b>
            </li>
          </ul>
        </motion.div>

        {/* Right Side Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center"
        >
          {/* Gradient circle background */}
          <div className="absolute -bottom-12 -right-10 w-80 h-80 bg-gradient-to-tr from-blue-200 to-teal-200 rounded-full blur-3xl opacity-70"></div>

          {/* Cards */}
          <div className="relative space-y-6">
            <motion.div
              className="bg-white shadow-lg rounded-2xl p-5 w-72 transform rotate-[-3deg]"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-bold text-gray-900 border-b pb-2 mb-2">AWARDS</h3>
              <p className="text-sm text-gray-600">Recognized for top performance and innovation.</p>
            </motion.div>

            <motion.div
              className="bg-white shadow-lg rounded-2xl p-5 w-72 transform rotate-[2deg]"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-bold text-gray-900 border-b pb-2 mb-2">EDUCATION</h3>
              <p className="text-sm text-gray-600">Bachelor’s in Computer Science — 2020</p>
            </motion.div>

            <motion.div
              className="bg-white shadow-lg rounded-2xl p-5 w-72 transform rotate-[-2deg]"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-bold text-gray-900 border-b pb-2 mb-2">EXPERIENCE</h3>
              <p className="text-sm text-gray-600">Frontend Developer — 2+ Years at XYZ</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>

    {/*resume example button arrow section*/}

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

      <FAQSection></FAQSection>

      {/* Call to Action */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Create Your Resume?
        </h2>
        <p className="mb-6 text-lg">
          Build a professional resume in minutes with our easy-to-use builder.
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition">
          Get Started Now →
        </button>
      </section>
    </div>
    </div>
</>
    );
}
export default Home_content;