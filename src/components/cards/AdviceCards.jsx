import React, { useEffect, useState } from "react";
import "../../styles/adviceCardStyles.css";
import { useNavigate } from "react-router-dom";

export default function AdviceCard({ adviceObj }) {
    const [isFavorite, setIsFavorite] = useState(false);



    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("adviceFavorites")) || [];
        setIsFavorite(saved.some((item) => item.id === adviceObj.id));
    }, [adviceObj.id]);



    const toggleFavorite = () => {
        const saved = JSON.parse(localStorage.getItem("adviceFavorites")) || [];
        let updated;

        if (isFavorite) {
            updated = saved.filter((item) => item.id !== adviceObj.id);
        } else {
            updated = [...saved, adviceObj];
        }

        localStorage.setItem("adviceFavorites", JSON.stringify(updated));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="advice-card">
            <div className="advice-header-bar">
                <span className="fav-star" onClick={toggleFavorite}>
                    {isFavorite ? "⭐" : "☆"}
                </span>
            </div>
            <p>{adviceObj.advice}</p>
        </div>
    );

}
