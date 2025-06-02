import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/apiAdviceStyles.css";

export default function AdviceCard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card" onClick={() => navigate("/advice")}>
      <img src="/images/wisdomAdvice.png" alt="Wisdom Advice Icon" />
      <h3>💡 Wisdom Advice</h3>
      <p>Tap to receive timeless words of wisdom 📚.</p>
    </div>
  );
}
