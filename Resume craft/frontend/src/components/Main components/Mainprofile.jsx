import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { LogOut, Edit3, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Read old saved user
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest User",
    email: "guest@example.com",
    password: "",
    education: [],
  };

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);

  // Temp values during editing
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Save profile changes
  const handleSave = async () => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!storedUser || (!storedUser._id && !storedUser.id)) {
      return alert("User not logged in!");
    }

    const userId = storedUser._id || storedUser.id;

    // Use optional chaining and fallback to empty string
    const name = formData.name?.trim();
    const email = formData.email?.trim();
    const password = formData.password?.trim();

    const body = {};
    if (name) body.name = name;
    if (email) body.email = email;
    if (password) body.password = password;

    const res = await axios.patch(
      `${API}/api/v1/users/${userId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      // Update localStorage (so UI updates instantly)
       setUser(res.data.updatedUser);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.updatedUser)
      );

      setEditMode(false);
      alert("Profile updated successfully!");
    }

  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center py-10 px-4 text-white">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-xl text-center"
      >

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-blue-300"
        >
          Profile Page
        </motion.h1>

        {/* Profile Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/20 p-6 rounded-2xl shadow-lg"
        >

          {/* Edit / Save Button */}
          <div className="flex justify-end mb-4">
            {!editMode ? (
              <button
                onClick={() => {setEditMode(true)}}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-medium flex items-center gap-2"
              >
                <Edit3 size={18} /> Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium flex items-center gap-2"
              >
                <Save size={18} /> Save
              </button>
            )}
          </div>

          {/* Show or Edit Fields */}
          {!editMode ? (
            <>
              <h2 className="text-3xl font-semibold mb-2">{user.name}</h2>
              <p className="text-lg">{user.email}</p>
            </>
          ) : (
            <div className="space-y-4 text-black">
              <input
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 rounded-xl"
              />

              <input
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 rounded-xl"
              />

              <input
                type="password"
                placeholder="Enter New Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 rounded-xl"
              />
            </div>
          )}

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleLogout}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full font-medium flex items-center justify-center gap-3 mx-auto shadow-lg"
          >
            <LogOut size={20} /> Logout
          </motion.button>

        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className="bg-white/20 p-4 rounded-xl shadow-lg border border-white/20"
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
