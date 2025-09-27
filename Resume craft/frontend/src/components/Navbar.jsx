import { Home } from "lucide-react";

function Navbar({ setActivePage }) {
  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold">Resume Builder</div>

          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => setActivePage("home")}
              className="hover:bg-blue-500 px-3 py-2 rounded"
            >
              Home
            </button>
            <button
              onClick={() => setActivePage("resume_example")}
              className="hover:bg-blue-500 px-3 py-2 rounded"
            >
              Resume Examples
            </button>
            <button
              onClick={() => setActivePage("ATS")}
              className="hover:bg-blue-500 px-3 py-2 rounded"
            >
              ATS
            </button>
            <button
              onClick={() => setActivePage("Template")}
              className="hover:bg-blue-500 px-3 py-2 rounded"
            >
              Templates
            </button>
            <button
              onClick={() => setActivePage("profile")}
              className="hover:bg-blue-500 px-3 py-2 rounded"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
