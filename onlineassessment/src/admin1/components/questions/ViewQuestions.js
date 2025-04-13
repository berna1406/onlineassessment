"use client"

import { useState } from "react"

const ViewQuestions = () => {
  // Sample question data
  const allQuestions = [
    {
      id: 1,
      text: "What is the most important quality of a team leader?",
      category: "Leadership Skills",
      difficulty: "Medium",
      type: "Multiple Choice",
    },
    {
      id: 2,
      text: "How would you handle a conflict between team members?",
      category: "Conflict Resolution",
      difficulty: "Hard",
      type: "Text Answer",
    },
    {
      id: 3,
      text: "A good leader should always prioritize team morale over project deadlines.",
      category: "Leadership Skills",
      difficulty: "Medium",
      type: "True/False",
    },
    {
      id: 4,
      text: "What approach would you take when a team member consistently underperforms?",
      category: "Performance Management",
      difficulty: "Hard",
      type: "Multiple Choice",
    },
    {
      id: 5,
      text: "Which of the following is NOT an effective communication strategy?",
      category: "Communication",
      difficulty: "Easy",
      type: "Multiple Choice",
    },
    {
      id: 6,
      text: "How would you motivate a team that is facing a challenging project with tight deadlines?",
      category: "Motivation",
      difficulty: "Medium",
      type: "Text Answer",
    },
  ]

  const [filter, setFilter] = useState({
    category: "",
    difficulty: "",
    type: "",
  })

  const [questions, setQuestions] = useState(allQuestions)

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilter = {
      ...filter,
      [name]: value,
    }
    setFilter(newFilter)

    // Apply filters
    let filteredQuestions = allQuestions
    if (newFilter.category) {
      filteredQuestions = filteredQuestions.filter((q) => q.category === newFilter.category)
    }
    if (newFilter.difficulty) {
      filteredQuestions = filteredQuestions.filter((q) => q.difficulty === newFilter.difficulty)
    }
    if (newFilter.type) {
      filteredQuestions = filteredQuestions.filter((q) => q.type === newFilter.type)
    }

    setQuestions(filteredQuestions)
  }

  const resetFilters = () => {
    setFilter({
      category: "",
      difficulty: "",
      type: "",
    })
    setQuestions(allQuestions)
  }

  return (
    <div>
      <h1 className="page-title">Question Bank</h1>

      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="card-header">
          <div className="card-title">Filter Questions</div>
        </div>
        <div className="card-content">
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <div className="form-group" style={{ margin: 0, flex: "1", minWidth: "200px" }}>
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="form-select"
                value={filter.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="Leadership Skills">Leadership Skills</option>
                <option value="Conflict Resolution">Conflict Resolution</option>
                <option value="Performance Management">Performance Management</option>
                <option value="Communication">Communication</option>
                <option value="Motivation">Motivation</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0, flex: "1", minWidth: "200px" }}>
              <label htmlFor="difficulty" className="form-label">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                className="form-select"
                value={filter.difficulty}
                onChange={handleFilterChange}
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0, flex: "1", minWidth: "200px" }}>
              <label htmlFor="type" className="form-label">
                Question Type
              </label>
              <select id="type" name="type" className="form-select" value={filter.type} onChange={handleFilterChange}>
                <option value="">All Types</option>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Text Answer">Text Answer</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0, display: "flex", alignItems: "flex-end" }}>
              <button className="btn btn-primary" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Questions</div>
          <div className="card-description">Total: {questions.length} questions</div>
        </div>
        <div className="card-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.text}</td>
                    <td>{question.category}</td>
                    <td>
                      <span
                        className={`badge ${
                          question.difficulty === "Easy"
                            ? "badge-success"
                            : question.difficulty === "Medium"
                              ? "badge-primary"
                              : "badge-danger"
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </td>
                    <td>{question.type}</td>
                    <td>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "12px" }}>
                          Edit
                        </button>
                        <button className="btn btn-danger" style={{ padding: "4px 8px", fontSize: "12px" }}>
                          Delete
                        </button>
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

export default ViewQuestions

