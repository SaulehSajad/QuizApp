// Result.jsx
function Results({ questionResults }) {
  return (
    <div id="question-details">
      <h3>"Your Performance Breakdown"</h3>
      <ul>
        {questionResults.map((result, index) => (
          <li
            key={index}
            className={`question-result ${
              result.isCorrect
                ? "correct"
                : result.isIncorrect
                ? "incorrect"
                : result.isSkipped
                ? "skipped"
                : "unanswered"
            }`}
          >
            <p>
              <strong>Question {index + 1}:</strong> {result.question}
            </p>
            {result.isCorrect && (
              <p>✅ You answered correctly: {result.userAnswer}</p>
            )}
            {result.isIncorrect && (
              <p>
                ❌ You answered: {result.userAnswer} (Correct answer:{" "}
                {result.correctAnswer})
              </p>
            )}
            {result.isSkipped && (
              <p>
                ⏩ You skipped this question (Correct answer:{" "}
                {result.correctAnswer})
              </p>
            )}
            {result.isUnanswered && (
              <p>
                ⏳ You didn't answer this question (Correct answer:{" "}
                {result.correctAnswer})
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
