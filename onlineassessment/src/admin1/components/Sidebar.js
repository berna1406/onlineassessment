"use client"

import { useState } from "react"
import "./Sidebar.css"

// Simple icon components
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const QuestionsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
)

const ResultsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
)

const Sidebar = ({ isOpen, isMobileOpen, toggleSidebar, toggleMobile, onMenuClick, activeContent }) => {
  // State to track which menus are expanded
  const [expandedMenus, setExpandedMenus] = useState({
    users: false,
    questions: false,
    results: false,
  })

  const toggleMenu = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu],
    })
  }

  const handleLogout = () => {
    console.log("Logout function called");
    // Backend logout logic here
    // Example using fetch (replace with your actual API endpoint)
    fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authentication headers (e.g., authorization token)
      },
    })
      .then((response) => {
        if (response.ok) {
          // Logout successful
          // Redirect the user to the login page or perform other actions
          window.location.href = '/admin1'; // Example redirect
        } else {
          // Logout failed
          console.error('Logout failed');
          // Handle the error (e.g., display an error message)
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        // Handle network errors or other exceptions
      });
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div className={`sidebar-overlay ${isMobileOpen ? "active" : ""}`} onClick={toggleMobile}></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"} ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">Assessment</span>
          </div>
          <button className="close-button" onClick={toggleMobile}>
            ×
          </button>
        </div>

        <div className="sidebar-content">
          <ul className="menu">
            <li className="menu-item">
              <a
                href="#"
                className={`menu-link ${activeContent === "home" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  onMenuClick("home")
                }}
              >
                <span className="icon">
                  <HomeIcon />
                </span>
                <span className="text">Home</span>
              </a>
            </li>

            <li className="menu-item">
              <div
                className={`menu-link ${expandedMenus.users ? "expanded" : ""} ${
                  activeContent === "viewAllUsers" || activeContent === "deleteUser" || activeContent === "editUser"
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleMenu("users")}
              >
                <span className="icon">
                  <UsersIcon />
                </span>
                <span className="text">Manage Users</span>
                <span className="arrow">{expandedMenus.users ? "▼" : "▶"}</span>
              </div>
              <ul className={`submenu ${expandedMenus.users ? "expanded" : ""}`}>
                <li>
                  <a
                    href="#"
                    className={activeContent === "viewAllUsers" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("viewAllUsers")
                    }}
                  >
                    View All Users
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeContent === "deleteUser" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("deleteUser")
                    }}
                  >
                    Delete User
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeContent === "editUser" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("editUser")
                    }}
                  >
                    Edit User
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-item">
              <div
                className={`menu-link ${expandedMenus.questions ? "expanded" : ""} ${
                  activeContent === "addQuestion" ||
                  activeContent === "editQuestion" ||
                  activeContent === "deleteQuestion" ||
                  activeContent === "viewQuestions"
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleMenu("questions")}
              >
                <span className="icon">
                  <QuestionsIcon />
                </span>
                <span className="text">Manage Questions</span>
                <span className="arrow">{expandedMenus.questions ? "▼" : "▶"}</span>
              </div>
              <ul className={`submenu ${expandedMenus.questions ? "expanded" : ""}`}>
                <li>
                  <a
                    href="#"
                    className={activeContent === "addQuestion" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("addQuestion")
                    }}
                  >
                    Add Question
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeContent === "editQuestion" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("editQuestion")
                    }}
                  >
                    Edit Question
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeContent === "deleteQuestion" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("deleteQuestion")
                    }}
                  >
                    Delete Question
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeContent === "viewQuestions" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("viewQuestions")
                    }}
                  >
                    View Questions
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-item">
              <div
                className={`menu-link ${expandedMenus.results ? "expanded" : ""} ${
                  activeContent === "viewResults" || activeContent === "publishResults" ? "active" : ""
                }`}
                onClick={() => toggleMenu("results")}
              >
                <span className="icon">
                  <ResultsIcon />
                </span>
                <span className="text">Manage Results</span>
                <span className="arrow">{expandedMenus.results ? "▼" : "▶"}</span>
              </div>
              <ul className={`submenu ${expandedMenus.results ? "expanded" : ""}`}>
                <li>
                  <a
                    href="#"
                    className={activeContent === "viewResults" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("viewResults")
                    }}
                  >
                    View Results
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeContent === "publishResults" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault()
                      onMenuClick("publishResults")
                    }}
                  >
                    Publish Results
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-item">
              <a href="#" className="menu-link" onClick={handleLogout}>
                <span className="icon">
                  <LogoutIcon />
                </span>
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">AD</div>
            <div className="user-details">
              <div className="user-name">Admin User</div>
              <div className="user-email">admin@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

