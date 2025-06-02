import React, { useEffect, useState } from "react";
import "../../styles/apiAdviceStyles.css";
import AdviceCard from "../cards/AdviceCards";
import { useNavigate } from "react-router-dom";

export default function ApiAdvice() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const navigate = useNavigate();

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    const updateFavCount = () => {
      const saved = JSON.parse(localStorage.getItem("adviceFavorites")) || [];
      setFavCount(saved.length);
    };

    updateFavCount();
    window.addEventListener("storage", updateFavCount);
    return () => window.removeEventListener("storage", updateFavCount);
  }, []);

  return (
    <div className="advice-container">
      <h1 className="advice-header">💡 Advice Generator</h1>

      <button
        className="favorites-button"
        onClick={() => navigate("/favorites")}
      >
        ⭐ Favorites ({favCount})
      </button>

      <div className="advice-content">
        {loading ? (
          <p className="loading-msg">Loading advice...</p>
        ) : advice ? (
          <AdviceCard adviceObj={advice} />
        ) : (
          <p className="no-advice">No advice available. Try again later.</p>
        )}
      </div>

      <button className="advice-button" onClick={fetchAdvice}>
        🔁 Get New Advice
      </button>
    </div>
  );
}
