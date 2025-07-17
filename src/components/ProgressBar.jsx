import React, { useEffect, useState } from "react";

function ProgressBar({ questionNo }) {
  const [timeRemaining, setTimeRemaining] = useState(15000);
  useEffect(() => {
    1;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [questionNo]);
  return (
    <div>
      <progress value={timeRemaining} max={15000} />
    </div>
  );
}

export default ProgressBar;
