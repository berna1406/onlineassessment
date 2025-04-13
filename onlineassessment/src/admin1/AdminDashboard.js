"use client"

import { useState } from "react"
import "./styles1.css"
import Sidebar from "./components/Sidebar"
import HomeContent from "./components/HomeContent"
import ViewAllUsers from "./components/users/ViewAllUsers"
import DeleteUser from "./components/users/DeleteUser"
import EditUser from "./components/users/EditUser"
import AddQuestion from "./components/questions/AddQuestion"
import EditQuestion from "./components/questions/EditQuestion"
import DeleteQuestion from "./components/questions/DeleteQuestion"
import ViewQuestions from "./components/questions/ViewQuestions"
import ViewResults from "./components/results/ViewResults"
import PublishResults from "./components/results/PublishResults"

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeContent, setActiveContent] = useState("home")

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
  }

  // Function to handle menu item clicks
  const handleMenuClick = (contentId) => {
    setActiveContent(contentId)
    // Close mobile sidebar when a menu item is clicked
    if (mobileOpen) {
      setMobileOpen(false)
    }
  }

  // Render the appropriate content based on activeContent state
  const renderContent = () => {
    switch (activeContent) {
      case "home":
        return <HomeContent />
      case "viewAllUsers":
        return <ViewAllUsers />
      case "deleteUser":
        return <DeleteUser />
      case "editUser":
        return <EditUser />
      case "addQuestion":
        return <AddQuestion />
      case "editQuestion":
        return <EditQuestion />
      case "deleteQuestion":
        return <DeleteQuestion />
      case "viewQuestions":
        return <ViewQuestions />
      case "viewResults":
        return <ViewResults />
      case "publishResults":
        return <PublishResults />
      default:
        return <HomeContent />
    }
  }

  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileOpen}
        toggleSidebar={toggleSidebar}
        toggleMobile={toggleMobile}
        onMenuClick={handleMenuClick}
        activeContent={activeContent}
      />
      <div className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <header className="content-header">
          <button className="menu-button" onClick={toggleMobile}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1 className="header-title">Team Leader Assessment Admin Dashboard</h1>
        </header>
        <main className="content-container">{renderContent()}</main>
      </div>
    </div>
  )
}

export default AdminDashboard

