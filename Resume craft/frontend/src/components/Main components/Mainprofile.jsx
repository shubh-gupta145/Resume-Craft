import React from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  // ✅ Read user details from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest User",
    email: "guest@example.com",
    education: [],
  };

  // ✅ Logout (remove token + user + redirect to login page)
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/"); // redirect to home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-3xl text-center text-white"
      >
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
        >
          Profile Page
        </motion.h1>

        {/* Profile Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white/20 p-6 rounded-2xl shadow-lg hover:shadow-pink-500/40 transition duration-500"
        >
          <h2 className="text-3xl font-semibold mb-2">{user.name}</h2>
          <p className="text-lg text-gray-200">{user.email}</p>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full font-medium flex items-center justify-center gap-2 mx-auto hover:shadow-[0_0_20px_rgba(255,0,100,0.6)] transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 text-left"
        >
          <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">
            Education Details
          </h3>

          <div className="space-y-4">
            {(user.education || []).map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                className="bg-white/10 border border-white/20 rounded-xl p-4 hover:scale-105 hover:bg-white/20 transition-transform duration-500"
              >
                <h4 className="text-xl font-semibold">{edu.degree}</h4>
                <p className="text-gray-200">{edu.college}</p>
                <p className="text-sm text-gray-300">{edu.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
