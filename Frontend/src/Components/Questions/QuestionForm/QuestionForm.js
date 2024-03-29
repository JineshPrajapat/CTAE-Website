import React, { useState } from "react";
import MyCKeditor from "../../MyCKEditor/MyCKEditor";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../api/api";
import "./QuestionForm.scss";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import FlashMessage from "../../FlashMessage/FlashMessage";

function QuestionForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setformValue] = useState({
    company: "",
    branch: "",
    link: "",
    year: "",
    title: "",
    difficulty: "",
    questionDescription: "",
  });


  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);                   // Navigate back to previous page
  };
  
  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleDescriptionChange = (questionDescription) => {
    console.log(questionDescription);
    setformValue((prevState) => ({
      ...prevState,
      questionDescription: questionDescription,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = (isConfirmed) => {
    if (isConfirmed) {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      console.log("frontend token",token);
      
      axios
        .post(`${baseURL}/questions/addQuestions`, {
          company: formValue.company,
          branch: formValue.branch,
          link: formValue.link,
          year: formValue.year,
          title: formValue.title,
          difficulty: formValue.difficulty,
          questionDescription: formValue.questionDescription,
        },{
          headers:{
            Authorization: `Bearer ${token}`            // Include token in Authorization header
          }
        })
        .then((response) => {
          console.log("Response:", response);

          if (response.status === 200) {
            setFlashMessage({
              type: "success",
              message:
                "We recieved your questions, will be update in 2 working days. Happy to see you soon!",
            });
            navigate('/Questions');
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error:", error);
            setFlashMessage({
              type: "error",
              message: "Reservation failed, try again!",
            });
          } else {
            console.error("Network or request error");
          }
        });
    }
    setShowConfirmation(false);
  };

  return (
    <div
      className={`question-body ${showConfirmation ? "show-confirmation" : ""}`}
    >
      <div className="question-heading">
        <h2>Want to contribute?</h2>
        <p>
          "Questions asked in interviews are like stepping stones to success;
          each one offers an opportunity to refine your understanding and
          sharpen your skills. Embrace them as valuable lessons, for they not
          only prepare you for the interview but also for the journey ahead."
        </p>
      </div>
      <div className="question-form-container">
        <form id="question-form" onSubmit={handleFormSubmit}>
          <label htmlFor="company" aria-required="true">
            Company:
            <input
              type="text"
              placeholder="Enter company name"
              id="company"
              name="company"
              value={formValue.company}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="Branch:">
            Branch
            <select
              id="branch"
              name="branch"
              value={formValue.branch}
              onChange={handleChange}
            >
              <option value="cse">Computer Science Engineering</option>
              <option value="ai&Da">
                Artificial Intelligence and Data Science
              </option>
              <option value="ece">
                Electronics and Communication Engineering
              </option>
              <option value="ee">Electrical Engineering</option>
              <option value="me">Mechanical Engineering</option>
              <option value="ag">Agriculture Engineering</option>
              <option value="ce">Civil Engineering</option>
              <option value="mge">MiningEngineering</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label htmlFor="year">Year:
            <input
              type="number"
              id="year"
              name="year"
              min="1900" max="2099" step="1"
              aria-hidden="true"
              value={formValue.year}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="title" aria-required="true">
            Question Title:
            <input
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              value={formValue.title}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="difficulty">
            Difficulty:
            <select
              id="difficulty"
              name="difficulty"
              value={formValue.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="questionDescription">
            Question Description:
            {/* <textarea
                            type="text"
                            placeholder="Write questions here"
                            id="questionDescription"
                            name="questionDescription"
                            value={formValue.questionDescription}
                            onChange={handleChange}
                        /> */}
            <MyCKeditor onDescriptionChange={handleDescriptionChange} />
          </label>
          <label htmlFor="link">
            Question Link:
            <input
              type="text"
              placeholder="Any link if availabel for this question"
              id="link"
              name="link"
              value={formValue.link}
              onChange={handleChange}
            />
          </label>

          {/* <button className="question-btn" type="submit">
            Submit Question
          </button> */}

          <div className="btn-post" >
            <button className="question-btn" type="submit">
            Submit Question
            </button>
            <div className="close" onClick={handleCancel}>Cancel</div>
          </div>
        </form>

        {/* confirmation component */}
        {showConfirmation && (
          <ConfirmationDialog
            message={"Are you sure you want to submit this form?"}
            onConfirm={handleConfirmation}
          />
        )}

        {/* flash component */}
        {flashMessage && (
          <FlashMessage
            type={flashMessage.type}
            message={flashMessage.message}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionForm;
