import React, { useState } from "react";
import './App.css';
import ChatBot from './components/ATS';
import Template_home from './components/Template_home';
import Resume_example from "./components/Resume_example";
import Profile from "./components/profile";
import Home_content from "./components/Home_content";
import Navbar from "./components/Navbar";

function App() {
  const [activePage, setActivePage] = useState("home"); // Track which page to show

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home_content />;
      case "resume_example":
        return <Resume_example />;
      case "ATS":
        return <ChatBot />;
      case "Template":
        return <Template_home />;
              case "profile":
        return <Profile/>;
      default:
        return <Navbar />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar with reference to setActivePage */}
      <Navbar setActivePage={setActivePage} />

      {/* Page content */}
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;

