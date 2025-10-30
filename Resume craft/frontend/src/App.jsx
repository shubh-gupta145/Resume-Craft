import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Main components/Navbar";
import Home_content from "./components/Main components/Home_content";
import Resume_example from "./components/Main components/Resume_example";
import ATS from "./components/Main components/ATS";
import Profile from "./components/Main components/profile";
import Template_home from "./components/Main components/Template_home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home_content />} />
        <Route path="/resume_example" element={<Resume_example />} />
        <Route path="/ats" element={<ATS />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/template" element={<Template_home />} />
      </Routes>
    </>
  );
}

export default App;
