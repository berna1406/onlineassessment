import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [domain, setDomain] = useState('');

    useEffect(() => {
        // Retrieve logged-in user's email (or username if stored differently)
        const userEmail = localStorage.getItem('userName');
        if (!userEmail) {
            navigate('/'); // Redirect to login if not authenticated
        } else {
            setUsername(userEmail);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userEmail'); // Clear stored user data
        localStorage.removeItem('userName')
        navigate('/'); // Redirect to login page
    };

    const handleStartAssessment = () => {
        if (!domain) {
            alert('Please select a domain to start the assessment.');
            return;
        }
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
        // const userId = loggedInUserId; // Ensure you have the logged-in user's ID
        console.log('userid: ',userId)
        if (!userId) {
            alert("User not logged in. Please log in to start the assessment.");
            return;
        }
    
        alert(`Starting assessment for: ${domain}`);
        navigate(`/rules/${encodeURIComponent(domain)}/${userId}`); // Correctly pass domain and userId
    };
    

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Welcome, {username}</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            
            <div className="card p-4 shadow-lg">
                <h4 className="mb-3">Select Assessment Domain</h4>
                <select className="form-select mb-3" value={domain} onChange={(e) => setDomain(e.target.value)}>
                    <option value="">-- Select Domain --</option>
                    <option value="Database Management">Database Management</option>
                    <option value="FrontEnd Designing">FrontEnd Designing</option>
                    <option value="FrontEnd Development">FrontEnd Development</option>
                    <option value="UI/UX Designing">UI/UX Designing</option>
                </select>
                <button className="btn btn-primary" onClick={handleStartAssessment}>Start Assessment</button>
            </div>
        </div>
    );
}

export default UserDashboard;