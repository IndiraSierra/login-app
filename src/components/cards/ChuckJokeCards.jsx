import React, { useState, useEffect } from "react";
import "../../styles/chuckJokesCardStyles.css";

export default function JokeCard({ joke }) {
    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    // LocalStorage KEY
    const STORAGE_KEY = "chuckFavorites";

    // Al montar, verifica si está en favoritos
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        setIsFavorite(saved.some((item) => item.id === joke.id));
    }, [joke.id]);

    const handleCopy = () => {
        navigator.clipboard.writeText(joke.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const toggleFavorite = () => {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        let updated;

        if (isFavorite) {
            updated = saved.filter((item) => item.id !== joke.id);
        } else {
            updated = [...saved, joke];
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="joke-card" onClick={handleCopy}>
            <div className="joke-header">
                <span className="star" onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite();
                }}>
                    {isFavorite ? "⭐" : "☆"}
                </span>
            </div>

            <p>{joke.value}</p>

            {copied && <span className="copied-msg">✔ Copied!</span>}

            <div className="joke-footer">
                <button
                    className={`like ${liked === true ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setLiked((prev) => (prev === true ? null : true));
                    }}
                >
                    {liked === true ? "👍" : "👍🏻" }
                </button>

                <button
                    className={`dislike ${liked === false ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setLiked((prev) => (prev === false ? null : false));
                    }}
                >
                    {liked === false ? "👎" : "👎🏻" }
                </button>
            </div>
        </div>
    );
}
