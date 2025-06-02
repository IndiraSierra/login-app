import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cardStyles.css";

export default function BoredCard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card" onClick={() => navigate("/bored")}>
      <img src="/images/bored.png" alt="Bored API" />
      <h3>🎯 Bored API</h3>
      <p>Find something fun to do when boredom hits!</p>
    </div>
  );
}