import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";   // ✅ required
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

function Login() {
  const navigate = useNavigate();       // ✅ initialize navigate
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
    useEffect(() => {
  // reset when component loads
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    }, []);
    useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    }, [isLogin]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API_URL; 
      const url = isLogin
        ? `${API}/api/v1/login`
        : `${API}/api/v1/users`;

      const bodyData = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(url, bodyData);
      if (res.data.success) {
        
        if (isLogin) {
          // For Login
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/profile");
        } else {
          // For Signup
          alert("User created successfully! Please login.");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(error);
      navigate("/server-error");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          {!isLogin && (
            <motion.input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {!isLogin && (
            <motion.input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-semibold text-gray-700">
              Continue with Google
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaGithub className="text-2xl text-gray-800" />
            <span className="font-semibold text-gray-700">
              Continue with GitHub
            </span>
          </motion.button>
        </div>

        {/* Toggle between login / signup */}
        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
