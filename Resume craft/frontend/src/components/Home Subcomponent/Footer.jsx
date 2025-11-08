import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-10 mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / Brand */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">ResumeBuilder<span className="text-yellow-300">.</span></h1>
          <p className="text-sm mt-2 text-gray-200">
            Create beautiful, ATS-friendly resumes in minutes.  
            Build. Download. Apply. Get hired.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col space-y-2 text-sm">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <a href="#" className="hover:text-yellow-300 transition-all">Home</a>
          <a href="#" className="hover:text-yellow-300 transition-all">Resume Templates</a>
          <a href="#" className="hover:text-yellow-300 transition-all">About Us</a>
          <a href="#" className="hover:text-yellow-300 transition-all">Contact</a>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-2xl">
            {[FaGithub, FaLinkedin, FaInstagram, FaGlobe].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-yellow-300 cursor-pointer"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      <hr className="border-gray-300 my-6 opacity-30" />

      <p className="text-center text-sm text-gray-200">
        © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
      </p>
    </motion.footer>
  );
}
