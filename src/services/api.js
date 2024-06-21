// src/services/api.js
const API_URL = "https://randomuser.me/api/?results=3&inc=name";

const fetchAdditionalQuestions = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch additional questions");
  }
  const data = await response.json();
  return data.results.map((user) => ({
    title: `What is your opinion on ${user.name.first} ${user.name.last}?`,
  }));
};

export default fetchAdditionalQuestions;
