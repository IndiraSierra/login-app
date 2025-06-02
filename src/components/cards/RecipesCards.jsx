import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/recipesCardsStyle.css";

export default function RecipesCards({ meal }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(null); // null | true
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("mealFavorites")) || [];
    setIsFavorite(savedFavs.some((fav) => fav.idMeal === meal.idMeal));

    const savedLikes = JSON.parse(localStorage.getItem("mealLikes")) || {};
    setIsLiked(savedLikes[meal.idMeal] || null);
  }, [meal.idMeal]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem("mealFavorites")) || [];
    let updated;
    if (isFavorite) {
      updated = saved.filter((fav) => fav.idMeal !== meal.idMeal);
    } else {
      updated = [...saved, meal];
    }
    localStorage.setItem("mealFavorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem("mealLikes")) || {};
    const newValue = isLiked === true ? null : true;
    saved[meal.idMeal] = newValue;
    localStorage.setItem("mealLikes", JSON.stringify(saved));
    setIsLiked(newValue);
  };

  const handleCardClick = () => {
    navigate(`/recipes/${meal.idMeal}`);
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <span className="fav-star" onClick={toggleFavorite}>
        {isFavorite ? "⭐" : "☆"}
      </span>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="recipe-image"
      />

      <div className="recipe-content">
        <h3>{meal.strMeal}</h3>
        <p className="category">{meal.strCategory}</p>
      </div>

      <div className="recipe-footer">
        <button className="like-button" onClick={toggleLike}>
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
