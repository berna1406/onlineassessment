import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function RulesPage() {
    const navigate = useNavigate();
    const { domain, userId } = useParams(); // Get domain & userId from URL
    const handleAccept = () => {
       console.log('Domain: '+domain)
       navigate(`/assessment/${encodeURIComponent(domain)}/${userId}`);// Pass domain & userId
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">Assessment Rules & Regulations</h2>
                <ul className="list-group list-group-numbered">
                    <li className="list-group-item">The assessment is time-bound and must be completed within the given time.</li>
                    <li className="list-group-item">Do not refresh or close the browser during the test.</li>
                    <li className="list-group-item">Each question carries equal marks. No negative marking.</li>
                    <li className="list-group-item">Once you submit the assessment, you cannot make changes.</li>
                    <li className="list-group-item">Ensure a stable internet connection to avoid disruptions.</li>
                </ul>
                <div className="text-center mt-4">
                    <button className="btn btn-success" onClick={handleAccept}>
                        Accept and Start Assessment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RulesPage;
