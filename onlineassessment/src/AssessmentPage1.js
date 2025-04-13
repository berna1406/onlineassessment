import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AssessmentPage() {
    const { domain, userId } = useParams(); 
    const navigate = useNavigate();
    
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes countdown
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/questions/${encodeURIComponent(domain)}/${userId}`)
            .then(response => {
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
        }
    };

    const handleSubmit = () => {
        axios.post("http://localhost:5000/api/submit-responses", { userId, responses })
            .then(() => {
                let countdown = 15;
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

            {/* Question Card */}
            <div className="card p-3">
                <h5>Question {currentQuestionIndex + 1} / {questions.length}</h5>
                {currentQuestion.image_path && (
                    <img src={currentQuestion.image_path} alt="Question" className="img-fluid" />
                )}
                <h4>{currentQuestion.question_text}</h4>

                {currentQuestion.question_type === "mcq" ? (
                    <div>
                        {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
                            <button
                                key={index}
                                className="btn btn-outline-primary m-2"
                                onClick={() => handleAnswerSelection(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                ) : (
                    <textarea
                        className="form-control"
                        placeholder="Type your answer here..."
                        onChange={(e) => handleAnswerSelection(e.target.value)}
                    />
                )}

                {/* Navigation Buttons */}
                {currentQuestionIndex < questions.length - 1 ? (
                    <button className="btn btn-success mt-3" onClick={handleNextQuestion}>Next</button>
                ) : (
                    <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
                )}
            </div>

            <h4 id="countdown"></h4>
        </div>
    );
}

export default AssessmentPage;
