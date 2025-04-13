import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: email,
                password: password
            });
    
            console.log("Login Response:", response.data); // ✅ Check server response
    
            if (response.status === 200) {
                localStorage.setItem('userName', response.data.name);
                localStorage.setItem('userId', response.data.userId);
                console.log("User name stored:", response.data.name); // ✅ Check if name is stored
    
                console.log("Navigating to user dashboard"); 
                navigate('/userdashboard'); // ✅ Navigate to dashboard
            } else {
                alert(response.data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email ID</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                                <Link to="/register" className="btn btn-link">Need an account? Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
