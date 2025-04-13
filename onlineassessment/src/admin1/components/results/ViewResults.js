"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch available domains from backend
    const fetchDomains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/domains");
        setDomains(response.data);
      } catch (err) {
        setError("Failed to fetch domains.");
        console.error("Error fetching domains:", err);
      }
    };

    fetchDomains();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/results?domain=${selectedDomain}&date=${selectedDate}`
      );
      setResults(response.data);
    } catch (err) {
      setError("Failed to fetch results.");
      console.error("Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  };

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
              <label htmlFor="domain" className="form-label">
                Select Domain
              </label>
              <select
                id="domain"
                className="form-select"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                <option value="">All Domains</option>
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ maxWidth: "400px" }}>
              <label htmlFor="date" className="form-label">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                className="form-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.user_id}>
                    <td>{result.user_name}</td>
                    <td>{result.total_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResults;