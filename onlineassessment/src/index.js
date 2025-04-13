import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import UserDashboard from './UserDashboard';
import RulesPage from './RulesPage';
import AssessmentPage from './AssessmentPage';

import AdminLogin from './admin1';
import AdminDashboard from './admin1/AdminDashboard';

function IndexPage() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Welcome to TL Assessment Portal</h2>
                        <div className="d-grid gap-2">
                            <Link to="/register" className="btn btn-primary btn-lg">Sign Up</Link>
                            <Link to="/login" className="btn btn-outline-primary btn-lg">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/rules/:domain/:userId" element={<RulesPage />} />
                <Route path="/assessment/:domain/:userId" element={<AssessmentPage />} />


                <Route path='/admin1' element={<AdminLogin/>} />
                <Route path='/admin1/dashboard' element={<AdminDashboard/>} />

            </Routes>
        </Router>
    </React.StrictMode>
);