import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cardStyles.css";

export default function ChuckNorrisCard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card " onClick={() => navigate("/jokes")}>
      <img src="/images/chuckNorris.png" alt="Chuck Norris" />
      <h3>🧠 Chuck Norris Jokes</h3>
      <p>Tap to unleash unstoppable jokes 💥</p>
    </div>
  );
}
