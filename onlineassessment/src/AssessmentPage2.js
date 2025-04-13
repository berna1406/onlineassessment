import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AssessmentPage() {
    const { domain, userId } = useParams(); 
    const navigate = useNavigate();
    
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(11 * 60); // 50 minutes countdown
    const [warningMessage, setWarningMessage] = useState("");
    const [assessmentEnded, setAssessmentEnded] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/questions/${encodeURIComponent(domain)}/${userId}`)
            .then(response => {
                console.log("Fetched Questions:", response.data); // Debugging
                setQuestions(response.data);
            })
            .catch(error => console.error("Error fetching questions:", error));
    }, [domain, userId]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit(); // Auto-submit when time expires
        } else if (timeLeft === 600) {
            setWarningMessage("⚠️ Only 10 minutes left! Hurry up!");
        } else if (timeLeft === 180) {
            setWarningMessage("⚠️ Final 3 minutes remaining! Complete your answers.");
        }

        const timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    if (questions.length === 0) return <h3>Loading questions...</h3>;

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        setResponses((prevResponses) => [
            ...prevResponses.filter(r => r.question_id !== currentQuestion.id),
            {
                question_id: currentQuestion.id,
                answer,
                correct: answer === currentQuestion.correct_answer,
                marks: answer === currentQuestion.correct_answer ? 1 : 0, // 1 mark for correct, 0 otherwise
                timestamp: new Date().toISOString(),
                domain
            }
        ]);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null); // Reset selected answer for next question
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(null); // Reset selected answer for previous question
        }
    };

    const handleSubmit = () => {
        if (!window.confirm("Are you sure you want to end the assessment?")) {
            return;
        }

        axios.post("http://localhost:5000/api/submit-responses", { userId, domain,responses })
            .then(() => {
                setAssessmentEnded(true);
                let countdown = 10;
                const interval = setInterval(() => {
                    if (countdown === 0) {
                        clearInterval(interval);
                        navigate("/");
                    } else {
                        document.getElementById("countdown").innerText = `Redirecting in ${countdown--}s...`;
                    }
                }, 1000);
            })
            .catch(error => console.error("Error submitting responses:", error));
    };

    return (
        <div className="container mt-4">
            {/* Header with End Assessment button */}
            <div className="d-flex justify-content-between align-items-center">
                <h2>Assessment - {domain}</h2>
                <button className="btn btn-danger" onClick={handleSubmit}>End Assessment</button>
            </div>

            {/* Timer & Warning Messages */}
            <p>
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </p>
            {warningMessage && <p className="text-danger"><strong>{warningMessage}</strong></p>}

            {/* Assessment Ended Message */}
            {assessmentEnded && (
                <div className="alert alert-warning mt-3">
                    <strong>Your assessment has ended.</strong> Contact the administrator to restart.
                    <p id="countdown" className="mt-2">Redirecting in 10s...</p>
                </div>
            )}

            {/* Question Card */}
            {!assessmentEnded && (
                <div className="card p-3">
                    <h5>Question {currentQuestionIndex + 1} / {questions.length}</h5>
                    
                    {currentQuestion.image_path && (
                        <img 
                            src={`http://localhost:5000/uploads/${currentQuestion.image_path}`} 
                            alt="Question" 
                            className="img-fluid"
                        />
                    )}
                    <h4>{currentQuestion.question_text}</h4>

                    {/* Render MCQ Questions with Radio Buttons */}
                    {currentQuestion.type.toLowerCase() === "mcq" ? (
                        <div>
                            {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4]
                                .filter(Boolean) // Ensure options exist
                                .map((option, index) => (
                                    <div key={index} className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id={`option-${index}`}
                                            name="mcq-options"
                                            value={option}
                                            checked={selectedAnswer === option}
                                            onChange={() => handleAnswerSelection(option)}
                                        />
                                        <label className="form-check-label" htmlFor={`option-${index}`}>
                                            {option}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    ) : currentQuestion.question_type.toLowerCase() === "programming" ? (
                        // Render Programming Questions with Large Textarea
                        <textarea
                            className="form-control"
                            placeholder="Write your answer here..."
                            rows="8"
                            onChange={(e) => handleAnswerSelection(e.target.value)}
                        />
                    ) : (
                        <textarea
                            className="form-control"
                            placeholder="Type your answer here..."
                            onChange={(e) => handleAnswerSelection(e.target.value)}
                        />
                    )}

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between mt-3">
                        <button 
                            className="btn btn-secondary" 
                            onClick={handlePreviousQuestion} 
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>

                        {currentQuestionIndex < questions.length - 1 ? (
                            <button className="btn btn-success" onClick={handleNextQuestion}>
                                Next
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssessmentPage;
