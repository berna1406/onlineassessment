import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AssessmentPage() {
    const { domain, userId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(50 * 60);
    const [warningMessage, setWarningMessage] = useState("");
    const [assessmentEnded, setAssessmentEnded] = useState(false);
    const [countdown, setCountdown] = useState(null);

    const isTabActive = useRef(true);
    const isMounted = useRef(true);
    const countdownRef = useRef(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/questions/${encodeURIComponent(domain)}/${userId}`)
            .then(response => {
                setQuestions(response.data);
                setAssessmentEnded(false);
                clearInterval(countdownRef.current);
            })
            .catch(error => console.error("Error fetching questions:", error));
    }, [domain, userId]);

    useEffect(() => {
        if (timeLeft <= 0 || !isTabActive.current) {
            handleSubmit(true);
        } else if (timeLeft === 600) {
            setWarningMessage("⚠️ Only 10 minutes left! Hurry up!");
        } else if (timeLeft === 180) {
            setWarningMessage("⚠️ Final 3 minutes remaining! Complete your answers.");
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            isTabActive.current = !document.hidden;
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleVisibilityChange);
        window.addEventListener("focus", handleVisibilityChange);

        const preventRefresh = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", preventRefresh);

        // Prevent Back Navigation
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, null, window.location.href);
        };

        // Disable F5 and Ctrl+R
        const disableKeys = (event) => {
            if (event.keyCode === 116 || (event.ctrlKey && event.keyCode === 82)) {
                event.preventDefault();
            }
        };
        document.addEventListener("keydown", disableKeys);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleVisibilityChange);
            window.removeEventListener("focus", handleVisibilityChange);
            window.removeEventListener("beforeunload", preventRefresh);
            document.removeEventListener("keydown", disableKeys);
        };
    }, []);

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
                marks: answer === currentQuestion.correct_answer ? 1 : 0,
                timestamp: new Date().toISOString(),
                domain,
            },
        ]);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(null);
        }
    };

    const handleSubmit = (autoSubmit = false) => {
        if (!autoSubmit && !window.confirm("Are you sure you want to end the assessment?")) {
            return;
        }

        let finalResponses = responses;
        if (autoSubmit) {
            finalResponses = questions.map(question => {
                const existingResponse = responses.find(r => r.question_id === question.id);
                if (existingResponse) {
                    return existingResponse;
                } else {
                    return {
                        question_id: question.id,
                        answer: "unanswered",
                        correct: false,
                        marks: 0,
                        timestamp: new Date().toISOString(),
                        domain,
                    };
                }
            });
        }

        axios.post("http://localhost:5000/api/submit-responses", { userId, domain, responses: finalResponses })
            .then(() => {
                setAssessmentEnded(true);
                setCountdown(10);

                if (countdownRef.current) clearInterval(countdownRef.current);
                countdownRef.current = setInterval(() => {
                    setCountdown(prev => {
                        if (prev === 1) {
                            clearInterval(countdownRef.current);
                            navigate("/");
                        }
                        return prev - 1;
                    });
                }, 1000);
            })
            .catch(error => console.error("Error submitting responses:", error));
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Assessment - {domain}</h2>
                <button className="btn btn-danger" onClick={handleSubmit}>End Assessment</button>
            </div>

            <p>
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </p>
            {warningMessage && <p className="text-danger"><strong>{warningMessage}</strong></p>}

            {assessmentEnded && (
                <div className="alert alert-warning mt-3">
                    <strong>Your assessment has ended.</strong> Contact the administrator to restart.
                    <p id="countdown" className="mt-2">Redirecting in {countdown}s...</p>
                </div>
            )}

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

                    {currentQuestion.type.toLowerCase() === "mcq" ? (
                        <div>
                            {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4]
                                .filter(Boolean)
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
                    ) : (
                        <textarea
                            className="form-control"
                            placeholder="Type your answer here..."
                            onChange={(e) => handleAnswerSelection(e.target.value)}
                        />
                    )}

                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-secondary" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
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