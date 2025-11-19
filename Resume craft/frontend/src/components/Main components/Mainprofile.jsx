import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { LogOut, Edit3, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    setFormData({
      name: storedUser.name || "",
      email: storedUser.email || "",
      password: "",
    });

    setLoading(false);
  }, []);

  // ❗ VERY IMPORTANT — this stops the crash
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSave = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!storedUser) return alert("User not logged in!");

      const userId = storedUser._id || storedUser.id;

      const body = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      if (formData.password.trim()) {
        body.password = formData.password.trim();
      }

      const res = await axios.patch(`${API}/api/v1/users/${userId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setUser(res.data.updatedUser);
        localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
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
        <h1 className="text-4xl font-bold mb-6">Profile Page</h1>

        <div className="bg-white/20 p-6 rounded-2xl shadow-lg">

          <div className="flex justify-end mb-4">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
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

          {/* SAFE user rendering */}
          {!editMode ? (
            <>
              <h2 className="text-3xl font-semibold mb-2">{user?.name}</h2>
              <p className="text-lg">{user?.email}</p>
            </>
          ) : (
            <div className="space-y-4 text-black">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 rounded-xl"
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 rounded-xl"
              />

              <input
                type="password"
                placeholder="New Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 rounded-xl"
              />
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleLogout}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full font-medium flex items-center justify-center gap-3 mx-auto"
          >
            <LogOut size={20} /> Logout
          </motion.button>

        </div>

        {/* Education Section */}
        <div className="mt-10 text-left">
          <h3 className="text-2xl font-semibold mb-4">Education Details</h3>

          <div className="space-y-4">
            {(user?.education || []).map((edu, index) => (
              <div key={index} className="bg-white/20 p-4 rounded-xl">
                <h4 className="text-xl font-semibold">{edu.degree}</h4>
                <p>{edu.college}</p>
                <p className="text-sm">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ProfilePage;
