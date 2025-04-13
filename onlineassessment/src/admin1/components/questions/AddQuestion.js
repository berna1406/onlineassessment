import { useState } from "react";
import axios from "axios";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    questionText: "",
    domain: "",
    type: "MCQ",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/testQuestion",
    //     formData
    //   );

    //   console.log(response.data);
    //   if(response.data.message === "test") {
    //     alert("test");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Error adding question: " + error.message);
    // }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addQuestion",
        formData
      );
      console.log(response)
      // Check if the response indicates success
      if (response.data && response.data.message === "Success") {
        console.log("Success:", response.data);
        alert("Question added successfully!");
        setFormData({
          questionText: "",
          domain: "",
          type: "MCQ",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctAnswer: "",
        });
      } else {
        // Handle unexpected response
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding question: " + error.message);
    }
  };

  return (
    <div>
      <h1 className="page-title">Add New Question</h1>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Question Details</div>
          <div className="card-description">
            Enter the details for the new assessment question
          </div>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="domain" className="form-label">
                Select the Domain
              </label>
              <select
                id="domain"
                name="domain"
                className="form-select"
                value={formData.domain}
                onChange={handleChange}
                required
              >
                <option value="">Select a domain</option>
                <option value="UI/UX Designing">UI/UX Designing</option>
                <option value="Front End Designing">Front End Designing</option>
                <option value="Front End Development">
                  Front End Development
                </option>
                <option value="BackEnd Development">BackEnd Development</option>
                <option value="Database Management">Database Management</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="questionText" className="form-label">
                Question Text
              </label>
              <textarea
                id="questionText"
                name="questionText"
                className="form-textarea"
                value={formData.questionText}
                onChange={handleChange}
                placeholder="Enter the question text"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Question Type
              </label>
              <select
                id="type"
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="MCQ">Multiple Choice</option>
              </select>
            </div>

            {formData.type === "MCQ" && (
              <div className="form-group">
                <label className="form-label">Answer Options</label>
                <div className="option-group" style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="radio"
                      id={`correct-1`}
                      name="correctAnswer"
                      value={formData.option1}
                      checked={formData.correctAnswer === formData.option1}
                      onChange={() =>
                        setFormData({ ...formData, correctAnswer: formData.option1 })
                      }
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder={`Option 1`}
                      name="option1"
                      value={formData.option1}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="option-group" style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="radio"
                      id={`correct-2`}
                      name="correctAnswer"
                      value={formData.option2}
                      checked={formData.correctAnswer === formData.option2}
                      onChange={() =>
                        setFormData({ ...formData, correctAnswer: formData.option2 })
                      }
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder={`Option 2`}
                      name="option2"
                      value={formData.option2}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="option-group" style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="radio"
                      id={`correct-3`}
                      name="correctAnswer"
                      value={formData.option3}
                      checked={formData.correctAnswer === formData.option3}
                      onChange={() =>
                        setFormData({ ...formData, correctAnswer: formData.option3 })
                      }
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder={`Option 3`}
                      name="option3"
                      value={formData.option3}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="option-group" style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="radio"
                      id={`correct-4`}
                      name="correctAnswer"
                      value={formData.option4}
                      checked={formData.correctAnswer === formData.option4}
                      onChange={() =>
                        setFormData({ ...formData, correctAnswer: formData.option4 })
                      }
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder={`Option 4`}
                      name="option4"
                      value={formData.option4}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div
                  className="help-text"
                  style={{ fontSize: "12px", color: "#6b7280", marginTop: "5px" }}
                >
                  Select the radio button next to the correct answer.
                </div>
              </div>
            )}

            <div style={{ marginTop: "20px" }}>
              <button type="submit" className="btn btn-primary">
                Add Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;