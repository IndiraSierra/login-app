import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/recipesDetailsStyles.css";

export default function RecipeDetails() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);


    const toggleFavorite = () => {
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


    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await res.json();
                if (data.meals && data.meals.length > 0) {
                    setMeal(data.meals[0]);
                } else {
                    setMeal(null);
                }
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };

        fetchMeal();
    }, [id]);

    if (!meal) {
        return <p className="loading-msg">Recipe not found...</p>;
    }

    return (
        <div className="recipe-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                ↩️ Back
            </button>

            <h1>{meal.strMeal}</h1>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-detail-image" />
            <h1>{meal.strMeal}</h1>
            <div>
                <span className="star" onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite();
                }}>
                    {isFavorite ? "⭐" : "☆"}
                </span>
            </div>

            <h3>Category: {meal.strCategory}</h3>
            <p><strong>Instructions:</strong></p>
            <p className="recipe-instructions">{meal.strInstructions}</p>

            <h4>Ingredients:</h4>
            <ul>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                    const ingredient = meal[`strIngredient${index}`];
                    const measure = meal[`strMeasure${index}`];
                    if (ingredient && ingredient.trim()) {
                        return <li key={index}>{ingredient} - {measure}</li>;
                    }
                    return null;
                })}
            </ul>
        </div>
    );
}
