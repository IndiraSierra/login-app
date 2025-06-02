import React, { useState, useEffect } from "react";
import "../../styles/apiBoredStyles.css";
import { useNavigate } from "react-router-dom";
import BoredCards from "../cards/BoredCards";

export default function ApiBored() {
    const [activity, setActivity] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [favCount, setFavCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("boredFavorites")) || [];
        setFavorites(saved);
    }, []);

    const fetchActivity = async () => {
        try {
            const res = await fetch("https://www.boredapi.com/api/activity/");
            //const res = await fetch("/api/activity/");   HAY QUE CAMBIAR AL PROXY PORQUE EL COSRS NO ESTÁ EN EL MISMO SERVIDOR LA APPI ME BLOQUEA PERO NO PUEDO SALIR POR EL 3000
            const data = await res.json();
            setActivity(data);
        } catch (err) {
            console.error("Error fetching activity:", err);
        }
    };

    const toggleFavorite = () => {
        if (!activity) return;

        const isAlreadyFav = favorites.some((fav) => fav.key === activity.key);
        const updated = isAlreadyFav
            ? favorites.filter((fav) => fav.key !== activity.key)
            : [...favorites, activity];

        localStorage.setItem("boredFavorites", JSON.stringify(updated));
        setFavorites(updated);
    };

    return (
        <div className="bored-container">
            <h1>😐 Feeling Bored?</h1>
            <button className="fetch-button" onClick={fetchActivity}>🎲 Get an Activity</button>
            <button className="favorites-button left-button" onClick={() => navigate("/favorites")}>
                ⭐ Favorites ({favCount})
            </button>
            {activity && (
                <div className="activity-card">
                    <span className="fav-star" onClick={toggleFavorite}>
                        {favorites.some((fav) => fav.key === activity.key) ? "⭐" : "☆"}
                    </span>
                    <h2>{activity.activity}</h2>
                    <p><strong>Type:</strong> {activity.type}</p>
                    <p><strong>Participants:</strong> {activity.participants}</p>
                </div>
            )}
        </div>
    );
}
