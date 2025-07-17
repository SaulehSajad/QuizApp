import React from "react";
import image from "../assets/quiz-logo.png";
function Header() {
  return (
    <header>
      <h1>Quiz</h1>
      <img src={image} alt="logo" />
    </header>
  );
}

export default Header;
