import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cardStyles.css";

export default function DashboardRecipesCards() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card" onClick={() => navigate("/recipes")}>
      <img src="/images/recipes.png" alt="Recipes" />
      <h2>🥘 Recipes Explorer</h2>
      <p>Search, like and favorite delicious meals 🍽️ </p>
    </div>
  );
}
