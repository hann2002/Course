import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const QuizContext = React.createContext();

function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
}

function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/questions")
      .then((response) => {
        const data = response.data;
        const randomQuestions = getRandomQuestions(data, 5);
        setQuestions(randomQuestions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function getRandomQuestions(data, num) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  function handleAnswer(answerIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.getElementsByClassName("option");
    if (currentQuestion.answer === answerIndex) {
      options[answerIndex].classList.add("correct");
      setNumCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev + 1);
    } else {
      options[answerIndex].classList.add("wrong");
    }
    for (let i = 0; i < options.length; i++) {
      options[i].disabled = true;
    }
    setTimeout(() => {
      for (let i = 0; i < options.length; i++) {
        options[answerIndex].classList.remove("correct", "wrong");
        options[i].disabled = false;
      }
      setCurrentQuestionIndex((prev) => prev + 1);
    }, 2000);
  }

  const value = {
    questions,
    currentQuestionIndex,
    numCorrectAnswers,
    selectedOptionIndex,
    score,
    handleAnswer,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export { QuizProvider, useQuizContext };
