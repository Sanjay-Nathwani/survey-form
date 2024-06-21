// src/hooks/useForm.js
import { useState } from "react";

const useForm = (callback) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      callback();
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.fullName) {
      errors.fullName = "Full Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.topic) {
      errors.topic = "Survey Topic is required";
    }
    if (values.topic === "Technology") {
      if (!values.favoriteLanguage) {
        errors.favoriteLanguage = "Favorite Programming Language is required";
      }
      if (!values.experience) {
        errors.experience = "Years of Experience is required";
      } else if (values.experience <= 0) {
        errors.experience = "Experience must be greater than 0";
      }
    }
    if (values.topic === "Health") {
      if (!values.exerciseFrequency) {
        errors.exerciseFrequency = "Exercise Frequency is required";
      }
      if (!values.dietPreference) {
        errors.dietPreference = "Diet Preference is required";
      }
    }
    if (values.topic === "Education") {
      if (!values.qualification) {
        errors.qualification = "Highest Qualification is required";
      }
      if (!values.fieldOfStudy) {
        errors.fieldOfStudy = "Field of Study is required";
      }
    }
    if (!values.feedback) {
      errors.feedback = "Feedback is required";
    } else if (values.feedback.length < 50) {
      errors.feedback = "Feedback must be at least 50 characters long";
    }
    return errors;
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
