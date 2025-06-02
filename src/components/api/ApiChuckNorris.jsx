import React, { useEffect, useState } from "react";
import "../../styles/apiChuckNorris.css";
import ChuckJokeCards from "../cards/ChuckJokeCards";
import { useNavigate } from "react-router-dom";


export default function ApiChuckNorris() {
    const [query, setQuery] = useState("kick");
    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [favCount, setFavCount] = useState(0);



    const fetchJokes = async (searchTerm) => {
        setLoading(true);
        try {
            const res = await fetch(`https://api.chucknorris.io/jokes/search?query=${searchTerm}`);
            const data = await res.json();
            setJokes(data.result || []);
        } catch (error) {
            console.error("Error fetching jokes:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRandomJoke = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://api.chucknorris.io/jokes/random");
            const data = await res.json();
            setJokes([data]);
        } catch (error) {
            console.error("Error fetching random joke:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const updateFavCount = () => {
            const saved = JSON.parse(localStorage.getItem("chuckFavorites")) || [];
            setFavCount(saved.length);
        };
        updateFavCount();
        window.addEventListener("storage", updateFavCount);
        return () => window.removeEventListener("storage", updateFavCount);
    }, []);


    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (query.length > 0) fetchJokes(query);
        }, 300);
        return () => clearTimeout(delaySearch);
    }, [query]);

    return (
        <div className="chuck-container">
            <h1>🔍 Chuck Norris Joke Finder</h1>

            <input
                type="text"
                placeholder="Type to find jokes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="chuck-search"
            />

            <button className="random-button center-button" onClick={fetchRandomJoke}>
                🎲 Random Joke
            </button>
            <button className="favorites-button left-button" onClick={() => navigate("/favorites")}>
                ⭐ Favorites ({favCount})
            </button>

            {loading ? (
                <p className="loading-msg">Loading jokes...</p>
            ) : (
                <div className="jokes-grid">
                    {jokes.length > 0 ? (
                        jokes.map((joke) => (
                            <ChuckJokeCards joke={joke} key={joke.id} />
                        ))
                    ) : (
                        <p className="no-results">No jokes found for: "{query}"</p>
                    )}
                </div>
            )}
        </div>
    );
}
