import { motion } from "framer-motion";

function Resume_example(){
    const templates = [
    { id: 1, image: "/images/resume-preview.png", name: "Modern Template" },
    { id: 2, image: "/images/resume-preview.png", name: "Professional Template" },
    { id: 3, image: "/images/resume-preview.png", name: "Creative Template" },
    { id: 4, image: "/images/resume-preview.png", name: "Minimal Template" },
  ];
    return(

<div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-4"
        >
          Resume Examples
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg"
        >
          Browse our collection of professional resume templates and choose the best fit for you.
        </motion.p>
      </section>

      {/* Resume Templates */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-2xl transition"
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Use This Template
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call To Action */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Build Your Resume?
        </motion.h2>
        <p className="mb-6 text-lg">Choose a template and start editing right away.</p>
        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition">
          Get Started →
        </button>
      </section>
    </div>

    );
}
export default Resume_example;