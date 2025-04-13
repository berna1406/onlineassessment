import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/admin/login", {
                email,
                password
            });

            if (response.data.success) {
                localStorage.setItem("adminToken", response.data.token);
                navigate("/admin/dashboard");
            } else {
                setError("Invalid email or password.");
            }
        } catch (err) {
            setError("Error logging in. Please try again."+err);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
                <Card.Body>
                    <h3 className="text-center mb-4">Admin Login</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter admin email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <Button variant="link" onClick={() => navigate("/admin/register")}>
                            Create New Admin
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminLogin;
