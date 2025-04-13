import "./Tables.css"

const TopCandidates = () => {
  const candidates = [
    {
      id: "C001",
      name: "Alex Johnson",
      position: "Senior Developer",
      score: 92,
      strengths: "Technical, Problem-solving",
      initials: "AJ",
    },
    {
      id: "C002",
      name: "Sarah Williams",
      position: "Project Manager",
      score: 89,
      strengths: "Communication, Organization",
      initials: "SW",
    },
    {
      id: "C003",
      name: "Michael Chen",
      position: "Technical Architect",
      score: 87,
      strengths: "Technical, Strategic Thinking",
      initials: "MC",
    },
    {
      id: "C004",
      name: "Emily Rodriguez",
      position: "Business Analyst",
      score: 85,
      strengths: "Analysis, Communication",
      initials: "ER",
    },
    {
      id: "C005",
      name: "David Kim",
      position: "DevOps Engineer",
      score: 83,
      strengths: "Technical, Collaboration",
      initials: "DK",
    },
  ]

  return (
    <div className="table-container">
      <h2 className="table-title">Top Leadership Candidates</h2>
      <p className="table-description">Candidates with the highest leadership assessment scores</p>

      <div className="table-responsive">
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
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <div className="candidate-info">
                    <div className="avatar">{candidate.initials}</div>
                    <div>
                      <div className="candidate-name">{candidate.name}</div>
                      <div className="candidate-id">{candidate.id}</div>
                    </div>
                  </div>
                </td>
                <td>{candidate.position}</td>
                <td>
                  <div className="score-display">
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `${candidate.score}%` }}></div>
                    </div>
                    <span>{candidate.score}%</span>
                  </div>
                </td>
                <td>{candidate.strengths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopCandidates

