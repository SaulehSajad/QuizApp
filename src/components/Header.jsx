import React from "react";
import headerImage from "../assets/quiz-logo.png";

function Header() {
  return (
    <header>
      <img src={headerImage} alt="logo" />
      <h1>REACT QUIZ</h1>
    </header>
  );
}

export default Header;
