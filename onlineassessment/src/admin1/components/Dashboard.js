  "use client"

  import { useState } from "react"
  import "./Dashboard.css"
  import RecentAssessments from "./RecentAssessments"
  import TopCandidates from "./TopCandidates"

  const Dashboard = ({ sidebarOpen, toggleSidebar, toggleMobile }) => {
    const [activeTab, setActiveTab] = useState("recent")

    return (
      <div className={`dashboard ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <header className="dashboard-header">
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
          <h1 className="header-title">Team Leader Selection Dashboard</h1>
          <button className="create-button">Create Assessment</button>
        </header>

        <main className="dashboard-content">
          <h1 className="page-title">Dashboard</h1>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <h3>Active Assessments</h3>
                <div className="stat-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </div>
              <div className="stat-value">12</div>
              <div className="stat-description">3 ending this week</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <h3>Total Candidates</h3>
                <div className="stat-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                </div>
              </div>
              <div className="stat-value">245</div>
              <div className="stat-description">+18% from last month</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <h3>Completed Assessments</h3>
                <div className="stat-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <div className="stat-value">89</div>
              <div className="stat-description">+7% from last month</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <h3>Leadership Score Avg.</h3>
                <div className="stat-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="10" width="4" height="10"></rect>
                    <rect x="10" y="4" width="4" height="16"></rect>
                    <rect x="18" y="8" width="4" height="12"></rect>
                  </svg>
                </div>
              </div>
              <div className="stat-value">78.3%</div>
              <div className="stat-description">+2.5% from last month</div>
            </div>
          </div>

          <div className="tabs">
            <div className="tab-list">
              <button className={`tab ${activeTab === "recent" ? "active" : ""}`} onClick={() => setActiveTab("recent")}>
                Recent Assessments
              </button>
              <button className={`tab ${activeTab === "top" ? "active" : ""}`} onClick={() => setActiveTab("top")}>
                Top Candidates
              </button>
            </div>
            <div className="tab-content">
              {activeTab === "recent" && <RecentAssessments />}
              {activeTab === "top" && <TopCandidates />}
            </div>
          </div>
        </main>
      </div>
    )
  }

  export default Dashboard

