import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrationPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [course, setCourse] = useState('');
    const [password, setPassword] = useState(''); // Add password state
    const navigate = useNavigate();

    const courses = ['MERN Stack', 'UIUX', 'JavaStack', 'Python'];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                name: name,
                email: email,
                mobile: mobile,
                course: course,
                password: password // Include password in the request
            });

            const data = response.data;

            if (response.status === 201) {
                alert(data.message);
                navigate('/login');
            } else {
                alert(data.error || 'Registration failed');
            }

        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">TL Candidate Registration</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email ID</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                <input type="tel" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="course" className="form-label">Course Name</label>
                                <select className="form-select" id="course" value={course} onChange={(e) => setCourse(e.target.value)} required>
                                    <option value="">-- Select Course --</option>
                                    {courses.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                                <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;