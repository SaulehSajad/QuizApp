// Summary.jsx
import React from "react";

function Summary({
  correctCount,
  incorrectCount,
  skippedCount,
  unansweredCount,
  onRestart,
}) {
  return (
    <div id="summary">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            marginLeft: "14rem",
          }}
        >
          Quiz Completed!
        </h2>
        <button
          onClick={onRestart}
          style={{
            background: "none",
            border: "none",
            marginRight: "5rem",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            fontSize: "50px",
            color: "inherit",
            outline: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            fill="#000000"
          >
            <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
          </svg>
        </button>
      </div>
      <div id="summary-stats">
        <p>
          <span className="number">{correctCount}</span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">{incorrectCount}</span>
          <span className="text">incorrect</span>
        </p>
        <p>
          <span className="number">{skippedCount}</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{unansweredCount}</span>
          <span className="text">unanswered</span>
        </p>
        <p>
          <span className="number">
            {correctCount + incorrectCount + skippedCount + unansweredCount}
          </span>
          <span className="text">total</span>
        </p>
      </div>
    </div>
  );
}

export default Summary;
