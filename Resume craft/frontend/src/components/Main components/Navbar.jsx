import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger icons
import { FcMultipleDevices } from "react-icons/fc";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClasses = (path) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "bg-blue-700 text-white"
        : "text-white hover:bg-blue-500 hover:text-white"
    }`;
    const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAVBAR CONTAINER */}
                    

        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          

          <div className="flex-shrink-0 text-2xl font-bold tracking-wide">
                        <FcMultipleDevices></FcMultipleDevices>

            Resume Builder
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link to="/resume_example" className={linkClasses("/resume_example")}>
              Resume Examples
            </Link>
            <Link to="/ats" className={linkClasses("/ats")}>
              ATS
            </Link>
            <Link to="/template" className={linkClasses("/template")}>
              Templates
            </Link>
            {isLoggedIn ? (
              <Link to="/profile" className={linkClasses("/profile")}>
                Profile
              </Link>
              ) : (
              <Link to="/login" className={linkClasses("/login")}>
                Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link onClick={toggleMenu} to="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link
              onClick={toggleMenu}
              to="/resume_example"
              className={linkClasses("/resume_example")}
            >
              Resume Examples
            </Link>
            <Link onClick={toggleMenu} to="/ats" className={linkClasses("/ats")}>
              ATS
            </Link>
            <Link
              onClick={toggleMenu}
              to="/template"
              className={linkClasses("/template")}
            >
              Templates
            </Link>
            <Link
              onClick={toggleMenu}
              to="/profile"
              className={linkClasses("/profile")}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
