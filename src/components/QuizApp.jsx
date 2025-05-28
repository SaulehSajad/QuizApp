import React, { useState, useEffect, useCallback } from "react";
import questions from "../util/questions"; // Import your question data

function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [userAnswers, setUserAnswers] = useState({});
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(15);
      setHasAnswered(false);
    }
  }, [currentQuestionIndex]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0 || hasAnswered) {
      const timer = setTimeout(nextQuestion, 1000);
      return () => clearTimeout(timer);
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, hasAnswered, nextQuestion]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(15);
    setHasAnswered(false);
  }, [currentQuestionIndex]);

  const handleAnswer = (answerIndex) => {
    if (!hasAnswered) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answerIndex,
      }));
      setHasAnswered(true);
    }
  };

  if (!currentQuestion) return <div>Quiz completed!</div>;

  return (
    <div id="quiz">
      <div className="timer">
        Time left: {timeLeft}s
        <div
          className="progress-bar"
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        ></div>
      </div>

      <div id="question">
        <h2>{currentQuestion.text}</h2>
      </div>
      <div id="answers">
        <div className="answer">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={hasAnswered}
              className={
                userAnswers[currentQuestion.id] === index ? "selected" : ""
              }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizApp;
