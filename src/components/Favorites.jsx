import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChuckJokeCards from "./cards/ChuckJokeCards";
import RecipesCards from "./cards/RecipesCards";
import AdviceCards from "./cards/AdviceCards";
import "../styles/apiChuckNorris.css";
import "../styles/apiRecipesStyles.css";
import "../styles/favoritesStyles.css";
import "../styles/adviceCardStyles.css";
import "../styles/boredCardStyles.css";

export default function Favorites() {
  const [favoriteJokes, setFavoriteJokes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteBored, setFavoriteBored] = useState([]);
  const [favoriteAdvice, setFavoriteAdvice] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJokes = JSON.parse(localStorage.getItem("chuckFavorites")) || [];
    const savedRecipes = JSON.parse(localStorage.getItem("mealFavorites")) || [];
    const savedBored = JSON.parse(localStorage.getItem("boredFavorites")) || [];
    const savedAdvice = JSON.parse(localStorage.getItem("adviceFavorites")) || [];


    setFavoriteJokes(savedJokes);
    setFavoriteRecipes(savedRecipes);
    setFavoriteBored(savedBored);
    setFavoriteAdvice(savedAdvice);
  }, []);

  return (
    <>
      <section className="favorites-section">
        <div className="chuck-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            ↩️ Back
          </button>
          <h1>⭐ Your Favorite Jokes</h1>
          {favoriteJokes.length === 0 ? (
            <p className="no-results">
              You haven't marked any favorite jokes yet.
            </p>
          ) : (
            <div className="favorites-grid">
              {favoriteJokes.map((joke) => (
                <ChuckJokeCards joke={joke} key={joke.id} />
              ))}
            </div>
          )}
        </div>
      </section>


      <section className="favorites-section">
        <div className="recipes-container">
          <h1>🍽️ Your Favorite Recipes</h1>
          {favoriteRecipes.length === 0 ? (
            <p className="no-results">
              You haven't saved any recipes yet.
            </p>
          ) : (
            <div className="favorites-grid">
              {favoriteRecipes.map((meal) => (
                <RecipesCards meal={meal} key={meal.idMeal} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="favorites-section">
        <div className="advice-container">
          <h1>💡 Favorite Advice</h1>
          {favoriteAdvice.length === 0 ? (
            <p className="no-results">No advice saved yet.</p>
          ) : (
            <div className="favorites-grid">
              {favoriteAdvice.map((item, index) => (
                <AdviceCards adviceObj={item} key={item.id || `advice-${index}`} />
              ))}
            </div>
          )}
        </div>
      </section>


      <section className="favorites-section">
        <div className="bored-container">
          <h1>🎉 Favorite Avtivities</h1>
          {favoriteBored.length === 0 ? (
            <p className="no-results">No Bored saved yet.</p>
          ) : (
            <div className="favorites-grid">
              {favoriteBored.map((item, index) => (
                <AdviceCards adviceObj={item} key={item.id || `bored-${index}`} />
              ))}
            </div>
          )}
        </div>
      </section>



    </>
  );
}