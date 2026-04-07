import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  FileText,
} from "lucide-react";
import Dashboard from "./Dashboard";
import BriefBuilder from "./BriefBuilder";

function MainLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.setAttribute(
      "data-bs-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      
      {/* Mobile Header */}
      <div className="d-lg-none p-3 border-bottom d-flex justify-content-between align-items-center bg-dark text-white sticky-top">
        <div className="d-flex align-items-center gap-2">
          <LayoutDashboard className="text-info" />
          <span className="fw-bold">AdVantage AI</span>
        </div>
        <button className="btn btn-link text-white p-0" onClick={toggleSidebar}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="p-4 d-flex align-items-center gap-3 mb-4">
          <div className="bg-info bg-opacity-10 p-2 rounded">
            <LayoutDashboard className="text-info" size={24} />
          </div>
          <span className="fw-bold fs-5 nav-text">AdVantage AI</span>
        </div>

        <nav className="px-3">
          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <button 
                className={`nav-link w-100 text-start d-flex align-items-center gap-3 rounded transition-all ${activeTab === 'dashboard' ? 'bg-info bg-opacity-10 text-info' : 'text-secondary'}`}
                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
              >
                <LayoutDashboard size={20} />
                <span className="nav-text">Campaigns</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link w-100 text-start d-flex align-items-center gap-3 rounded transition-all ${activeTab === 'brief' ? 'bg-info bg-opacity-10 text-info' : 'text-secondary'}`}
                onClick={() => { setActiveTab('brief'); setSidebarOpen(false); }}
              >
                <FileText size={20} />
                <span className="nav-text">AI Brief Builder</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link w-100 text-start d-flex align-items-center gap-3 rounded text-secondary">
                <Users size={20} />
                <span className="nav-text">Clients</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link w-100 text-start d-flex align-items-center gap-3 rounded text-secondary">
                <Settings size={20} />
                <span className="nav-text">Settings</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto p-4 border-top border-secondary border-opacity-10">
          <button 
            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="nav-text">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "dashboard" ? <Dashboard /> : <BriefBuilder />}
      </main>
    </div>
  );
}

export default MainLayout;


