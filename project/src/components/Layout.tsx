import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Camera as VideoCamera } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navLinkClasses = (path: string) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <VideoCamera className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">LearnTrack</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className={navLinkClasses("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/lectures" className={navLinkClasses("/lectures")}>
                Lectures
              </Link>
              <Link to="/progress" className={navLinkClasses("/progress")}>
                My Progress
              </Link>
              <Link to="/settings" className={navLinkClasses("/settings")}>
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <VideoCamera className="h-6 w-6 text-blue-600" />
              <span className="text-gray-600 font-medium">LearnTrack</span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LearnTrack. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;