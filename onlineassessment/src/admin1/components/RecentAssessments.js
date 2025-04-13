import "./Tables.css"

const RecentAssessments = () => {
  const assessments = [
    {
      id: "ASS-001",
      name: "Technical Team Lead Assessment",
      candidates: 42,
      completion: 68,
      date: "2025-03-25",
      status: "Active",
    },
    {
      id: "ASS-002",
      name: "Project Management Skills",
      candidates: 36,
      completion: 92,
      date: "2025-03-20",
      status: "Active",
    },
    {
      id: "ASS-003",
      name: "Leadership Competency Evaluation",
      candidates: 28,
      completion: 100,
      date: "2025-03-15",
      status: "Completed",
    },
    {
      id: "ASS-004",
      name: "Communication Skills Assessment",
      candidates: 54,
      completion: 75,
      date: "2025-03-10",
      status: "Active",
    },
    {
      id: "ASS-005",
      name: "Problem-Solving Scenarios",
      candidates: 31,
      completion: 100,
      date: "2025-03-05",
      status: "Completed",
    },
  ]

  return (
    <div className="table-container">
      <h2 className="table-title">Recent Assessments</h2>
      <p className="table-description">Overview of the most recent team leader assessments</p>

      <div className="table-responsive">
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
            {assessments.map((assessment) => (
              <tr key={assessment.id}>
                <td className="font-medium">{assessment.id}</td>
                <td>{assessment.name}</td>
                <td>{assessment.candidates}</td>
                <td>{assessment.completion}%</td>
                <td>{assessment.date}</td>
                <td>
                  <span className={`badge ${assessment.status === "Active" ? "badge-primary" : "badge-success"}`}>
                    {assessment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentAssessments

