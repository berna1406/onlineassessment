const HomeContent = () => {
    return (
      <div className="home-content">
        <h1 className="page-title">Dashboard Overview</h1>
  
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Users</h3>
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
            <div className="stat-description">+12 new users this week</div>
          </div>
  
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Questions</h3>
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
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
            </div>
            <div className="stat-value">320</div>
            <div className="stat-description">Across 15 categories</div>
          </div>
  
          <div className="stat-card">
            <div className="stat-header">
              <h3>Assessments Completed</h3>
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>
            <div className="stat-value">189</div>
            <div className="stat-description">+7% from last month</div>
          </div>
  
          <div className="stat-card">
            <div className="stat-header">
              <h3>Average Score</h3>
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
            <div className="stat-value">76.4%</div>
            <div className="stat-description">+2.5% from last month</div>
          </div>
        </div>
  
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Assessments</div>
            <div className="card-description">Overview of the most recent team leader assessments</div>
          </div>
          <div className="card-content">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Assessment Name</th>
                    <th>Candidates</th>
                    <th>Completion %</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">ASS-001</td>
                    <td>Technical Team Lead Assessment</td>
                    <td>42</td>
                    <td>68%</td>
                    <td>2025-03-25</td>
                    <td>
                      <span className="badge badge-primary">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">ASS-002</td>
                    <td>Project Management Skills</td>
                    <td>36</td>
                    <td>92%</td>
                    <td>2025-03-20</td>
                    <td>
                      <span className="badge badge-primary">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">ASS-003</td>
                    <td>Leadership Competency Evaluation</td>
                    <td>28</td>
                    <td>100%</td>
                    <td>2025-03-15</td>
                    <td>
                      <span className="badge badge-success">Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <div className="card">
          <div className="card-header">
            <div className="card-title">Top Performing Candidates</div>
            <div className="card-description">Candidates with the highest leadership assessment scores</div>
          </div>
          <div className="card-content">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Current Position</th>
                    <th>Leadership Score</th>
                    <th>Key Strengths</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="candidate-info">
                        <div className="avatar">AJ</div>
                        <div>
                          <div className="candidate-name">Alex Johnson</div>
                          <div className="candidate-id">C001</div>
                        </div>
                      </div>
                    </td>
                    <td>Senior Developer</td>
                    <td>
                      <div className="score-display">
                        <div className="progress-container">
                          <div className="progress-bar" style={{ width: "92%" }}></div>
                        </div>
                        <span>92%</span>
                      </div>
                    </td>
                    <td>Technical, Problem-solving</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="candidate-info">
                        <div className="avatar">SW</div>
                        <div>
                          <div className="candidate-name">Sarah Williams</div>
                          <div className="candidate-id">C002</div>
                        </div>
                      </div>
                    </td>
                    <td>Project Manager</td>
                    <td>
                      <div className="score-display">
                        <div className="progress-container">
                          <div className="progress-bar" style={{ width: "89%" }}></div>
                        </div>
                        <span>89%</span>
                      </div>
                    </td>
                    <td>Communication, Organization</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default HomeContent
  
  