import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Main components/Navbar";
import Home_content from "./components/Main components/Home_content";
import Resume_example from "./components/Main components/Resume_example";
import ATS from "./components/Main components/ATS";
import Login from "./components/Main components/Login";
import Template_home from "./components/Main components/Template_home";

import ProfilePage from "./components/Main components/Mainprofile"
import ProtectedRoute from "./components/Main components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home_content />} />
        <Route path="/resume_example" element={<Resume_example />} />
        <Route path="/ats" element={<ATS />} />
        <Route path="/login" element={<Login />} />
        <Route path="/template" element={<Template_home />} />
         <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
