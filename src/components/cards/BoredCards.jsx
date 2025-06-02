import React, { useEffect, useState } from "react";
import "../../styles/boredCardStyles.css";

export default function BoredCards({ activityObj }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("boredFavorites")) || [];
    setIsFavorite(saved.some((fav) => fav.key === activityObj.key));
  }, [activityObj.key]);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("boredFavorites")) || [];
    let updated;

    if (isFavorite) {
      updated = saved.filter((fav) => fav.key !== activityObj.key);
    } else {
      updated = [...saved, activityObj];
    }

    localStorage.setItem("boredFavorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="activity-card">
      <span className="fav-star" onClick={toggleFavorite}>
        {isFavorite ? "⭐" : "☆"}
      </span>
      <h3>{activityObj.activity}</h3>
      <p><strong>Type:</strong> {activityObj.type}</p>
      <p><strong>Participants:</strong> {activityObj.participants}</p>
    </div>
  );
}
