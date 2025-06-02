import React, { useState, useEffect } from "react";
import "../../styles/apiRecipesStyles.css";
import RecipesCards from "../cards/RecipesCards";
import { useNavigate } from "react-router-dom";


export async function fetchMeals(searchTerm) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching meals:', error);
    return [];
  }
}
export async function fetchRandomMeal() {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching random meal:', error);
    return null;
  }
}


export default function ApiRecipes() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [favCount, setFavCount] = useState(0);

  const searchMeals = async (term) => {
    setLoading(true);
    const results = await fetchMeals(term);
    setMeals(results);
    setLoading(false);
  };

  const getRandomMeal = async () => {
    setLoading(true);
    const random = await fetchRandomMeal();
    setMeals(random ? [random] : []);
    setLoading(false);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length > 0) {
        searchMeals(query);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    const updateFavCount = () => {
      const saved = JSON.parse(localStorage.getItem("mealFavorites")) || [];
      setFavCount(saved.length);
    };
    updateFavCount();
    window.addEventListener("storage", updateFavCount);
    return () => window.removeEventListener("storage", updateFavCount);
  }, []);


  return (
    <div className="recipes-container">
      <h1>🥘 Recipes Explorer</h1>

      <div className="recipes-controls">
        <input
          type="text"
          placeholder="Search meals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="recipes-input"
        />
        <div className="recipes-buttons">
          <button className="random-button" onClick={getRandomMeal}>
            🎲 Random Recipe
          </button>
          <button className="favorites-button button-possition" onClick={() => navigate("/favorites")}>
            ⭐ Favorites ({favCount})
          </button>
        </div>
      </div>

      {loading ? (
        <p className="loading-msg">Loading recipes...</p>
      ) : (
        <div className="recipes-grid">
          {meals.length > 0 ? (
            meals.map((meal) => <RecipesCards key={meal.idMeal} meal={meal} />)
          ) : (
            <p className="no-results">No recipes found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}
