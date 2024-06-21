// src/components/SurveyForm.js
import { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import fetchAdditionalQuestions from "../services/api.js";
import "../styles/SurveyForm.css";

const SurveyForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(submitForm);
  const [topic, setTopic] = useState("");
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    if (topic) {
      fetchAdditionalQuestions().then(setAdditionalQuestions);
    }
  }, [topic]);

  function submitForm() {
    alert(JSON.stringify({ ...values, additionalQuestions }, null, 2));
  }

  const handleTopicChange = (e) => {
    handleChange(e);
    setTopic(e.target.value);
    setAdditionalQuestions([]); // Reset additional questions on topic change
  };

  return (
    <form className="survey-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={values.fullName || ""}
          onChange={handleChange}
          required
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Survey Topic</label>
        <select
          name="topic"
          value={values.topic || ""}
          onChange={handleTopicChange}
          required
        >
          <option value="">Select...</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.topic && <p className="error">{errors.topic}</p>}
      </div>

      {topic === "Technology" && (
        <>
          <div className="form-group">
            <label>Favorite Programming Language</label>
            <select
              name="favoriteLanguage"
              value={values.favoriteLanguage || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteLanguage && (
              <p className="error">{errors.favoriteLanguage}</p>
            )}
          </div>

          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={values.experience || ""}
              onChange={handleChange}
              required
            />
            {errors.experience && <p className="error">{errors.experience}</p>}
          </div>
        </>
      )}

      {topic === "Health" && (
        <>
          <div className="form-group">
            <label>Exercise Frequency</label>
            <select
              name="exerciseFrequency"
              value={values.exerciseFrequency || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && (
              <p className="error">{errors.exerciseFrequency}</p>
            )}
          </div>

          <div className="form-group">
            <label>Diet Preference</label>
            <select
              name="dietPreference"
              value={values.dietPreference || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && (
              <p className="error">{errors.dietPreference}</p>
            )}
          </div>
        </>
      )}

      {topic === "Education" && (
        <>
          <div className="form-group">
            <label>Highest Qualification</label>
            <select
              name="qualification"
              value={values.qualification || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor&apos;s</option>
              <option value="Master's">Master&apos;s</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.qualification && (
              <p className="error">{errors.qualification}</p>
            )}
          </div>

          <div className="form-group">
            <label>Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={values.fieldOfStudy || ""}
              onChange={handleChange}
              required
            />
            {errors.fieldOfStudy && (
              <p className="error">{errors.fieldOfStudy}</p>
            )}
          </div>
        </>
      )}

      {additionalQuestions.length > 0 && (
        <>
          <h3>Additional Questions</h3>
          {additionalQuestions.map((question, index) => (
            <div key={index} className="form-group">
              <label>{question.title}</label>
              <input
                type="text"
                name={`additional-${index}`}
                value={values[`additional-${index}`] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
        </>
      )}

      <div className="form-group">
        <label>Feedback</label>
        <textarea
          name="feedback"
          value={values.feedback || ""}
          onChange={handleChange}
          required
          minLength="50"
        />
        {errors.feedback && <p className="error">{errors.feedback}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
