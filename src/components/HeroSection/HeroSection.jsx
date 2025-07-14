import React from "react";

function HeroSection() {
  return (
    <div className="hero-section">
      <span>
        Build the habits that <span style={{color:"orange"}}>matter!</span>
      </span>
      <p className="hero-section-text">
        Feeling overwhelmed? Our easy-to-use habit tracker helps you take
        control of your day and achieve your goals.
      </p>
      <button className="hero-section-button">{`Let's get started!`}</button>
    </div>
  );
}

export default HeroSection;
