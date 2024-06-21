import React from "react";
import SurveyForm from "./components/SurveyForm";

const styles = {
  textAlign: "center",
  margin: "20px 0px 10px 0px"
}

const App = () => {
  return (
    <div className="App">
      <h1 style={styles}>Survey Form</h1>
      <SurveyForm />
    </div>
  );
};

export default App;
