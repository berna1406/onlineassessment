"use client"

import { useState } from "react"

const ViewResults = () => {
  // Sample results data
  const allResults = [
    {
      id: 1,
      assessmentName: "Technical Team Lead Assessment",
      candidateName: "Alex Johnson",
      score: 92,
      completionDate: "2025-03-20",
      status: "Published",
    },
    {
      id: 2,
      assessmentName: "Project Management Skills",
      candidateName: "Sarah Williams",
      score: 89,
      completionDate: "2025-03-18",
      status: "Published",
    },
    {
      id: 3,
      assessmentName: "Leadership Competency Evaluation",
      candidateName: "Michael Chen",
      score: 87,
      completionDate: "2025-03-15",
      status: "Published",
    },
    {
      id: 4,
      assessmentName: "Communication Skills Assessment",
      candidateName: "Emily Rodriguez",
      score: 85,
      completionDate: "2025-03-22",
      status: "Pending",
    },
    {
      id: 5,
      assessmentName: "Problem-Solving Scenarios",
      candidateName: "David Kim",
      score: 83,
      completionDate: "2025-03-21",
      status: "Pending",
    },
  ]

  const [results, setResults] = useState(allResults)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term.trim() === "") {
      setResults(allResults)
    } else {
      const filtered = allResults.filter(
        (result) =>
          result.assessmentName.toLowerCase().includes(term) || result.candidateName.toLowerCase().includes(term),
      )
      setResults(filtered)
    }
  }

  return (
    <div>
      <h1 className="page-title">Assessment Results</h1>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Results Management</div>
          <div className="card-description">View and manage assessment results</div>
        </div>
        <div className="card-content">
          <div style={{ marginBottom: "20px" }}>
            <div className="form-group" style={{ maxWidth: "400px" }}>
              <label htmlFor="search" className="form-label">
                Search
              </label>
              <input
                type="text"
                id="search"
                className="form-input"
                placeholder="Search by assessment or candidate name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Assessment</th>
                  <th>Candidate</th>
                  <th>Score</th>
                  <th>Completion Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td>{result.id}</td>
                    <td>{result.assessmentName}</td>
                    <td>{result.candidateName}</td>
                    <td>
                      <div className="score-display">
                        <div className="progress-container">
                          <div className="progress-bar" style={{ width: `${result.score}%` }}></div>
                        </div>
                        <span>{result.score}%</span>
                      </div>
                    </td>
                    <td>{result.completionDate}</td>
                    <td>
                      <span className={`badge ${result.status === "Published" ? "badge-success" : "badge-warning"}`}>
                        {result.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "12px" }}>
                          View
                        </button>
                        {result.status === "Pending" && (
                          <button className="btn btn-success" style={{ padding: "4px 8px", fontSize: "12px" }}>
                            Publish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewResults

