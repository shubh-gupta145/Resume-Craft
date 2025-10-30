import { motion } from "framer-motion";
import { FileText, Palette, Briefcase, Layers, Type, Lightbulb } from "lucide-react";

const features = [
  { icon: <FileText size={40} className="text-purple-500" />, title: "Powerful resume builder", description: "Use our creation tools and expert guidance to build the perfect resume for your next job application." },
  { icon: <Briefcase size={40} className="text-pink-500" />, title: "Professional templates", description: "Choose from 25+ modern templates that are fully ATS-friendly and professionally designed." },
  { icon: <Palette size={40} className="text-indigo-500" />, title: "Customize fonts and colors", description: "Select custom fonts and color themes to make your resume truly unique." },
  { icon: <Layers size={40} className="text-violet-500" />, title: "Free resume examples", description: "Use our 500+ free resume examples to see what a great resume looks like in your field." },
  { icon: <Type size={40} className="text-purple-600" />, title: "ATS-friendly templates", description: "Our templates are optimized for applicant tracking systems, ensuring maximum visibility." },
  { icon: <Lightbulb size={40} className="text-pink-600" />, title: "Expert tips and guidance", description: "Get step-by-step help as you build your resume with expert tips and suggestions." },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          Everything You Need to Build Your Resume
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50"
>

              <div className="flex justify-center mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
