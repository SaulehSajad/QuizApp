import React, { useEffect, useRef, useState } from "react";
import QUESTIONS from "../util/questions";
import ProgressBar from "./ProgressBar";
import Summary from "./Summary";
import Results from "./Results";

function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const timer = useRef(null);

  const restartQuiz = () => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setQuestionNo(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizCompleted(false);
  };

  useEffect(() => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const currentQuestion = shuffledQuestions[questionNo];
  const correctAnswer = currentQuestion?.answers[0];

  const shuffledAnswers = React.useMemo(() => {
    if (!currentQuestion) return [];
    const answers = [...currentQuestion.answers];
    return answers.sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[questionNo] = answer;
      setAnswers(newAnswers);

      if (questionNo < shuffledQuestions.length - 1) {
        setQuestionNo((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const handleSkipQuestion = () => {
    clearTimeout(timer.current);
    const newAnswers = [...answers];
    newAnswers[questionNo] = "skipped";
    setAnswers(newAnswers);

    if (questionNo < shuffledQuestions.length - 1) {
      setQuestionNo((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const getButtonClass = (answer) => {
    if (!showFeedback) return "";

    if (answer === correctAnswer) {
      return "correct";
    } else if (answer === selectedAnswer && answer !== correctAnswer) {
      return "wrong";
    }
    return "";
  };

  useEffect(() => {
    if (
      questionNo < shuffledQuestions.length &&
      !quizCompleted &&
      shuffledQuestions.length > 0
    ) {
      timer.current = setTimeout(() => {
        const newAnswers = [...answers];
        newAnswers[questionNo] = null;
        setAnswers(newAnswers);

        if (questionNo < shuffledQuestions.length - 1) {
          setQuestionNo((prev) => prev + 1);
        } else {
          setQuizCompleted(true);
        }
      }, 15000);
    }

    return () => clearTimeout(timer.current);
  }, [questionNo, quizCompleted, shuffledQuestions]);

  if (
    quizCompleted ||
    questionNo >= shuffledQuestions.length ||
    shuffledQuestions.length === 0
  ) {
    const correctCount = answers.filter(
      (answer, i) => answer === shuffledQuestions[i]?.answers[0]
    ).length;
    const skippedCount = answers.filter(
      (answer) => answer === "skipped"
    ).length;
    const unansweredCount = answers.filter((answer) => answer === null).length;
    const incorrectCount =
      answers.length - correctCount - skippedCount - unansweredCount;

    const questionResults = shuffledQuestions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.answers[0];
      const isSkipped = userAnswer === "skipped";
      const isUnanswered = userAnswer === null;
      const isIncorrect = !isCorrect && !isSkipped && !isUnanswered;

      return {
        question: question.text,
        userAnswer,
        correctAnswer: question.answers[0],
        isCorrect,
        isSkipped,
        isUnanswered,
        isIncorrect,
      };
    });

    return (
      <>
        <Summary
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          skippedCount={skippedCount}
          unansweredCount={unansweredCount}
          onRestart={restartQuiz}
        />
        <Results questionResults={questionResults} />
      </>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <p id="question-overview">
          Question {questionNo + 1} of {shuffledQuestions.length}
        </p>
        <ProgressBar
          key={questionNo}
          questionNo={questionNo}
          maxQuestions={shuffledQuestions.length}
        />
        <h2>{currentQuestion.text}</h2>
      </div>
      <ul id="answers">
        {shuffledAnswers.map((answer, index) => (
          <li className="answer" key={index}>
            <button
              onClick={() => handleAnswerSelection(answer)}
              className={getButtonClass(answer)}
              disabled={showFeedback}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <button
        id="skip-btn"
        onClick={handleSkipQuestion}
        disabled={showFeedback}
      >
        Skip
      </button>
    </div>
  );
}

export default Quiz;
