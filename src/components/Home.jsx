import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/homeStyle.css";

export default function Home() {
  const [showEyesOpen, setShowEyesOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowEyesOpen(true);
      const timeout = setTimeout(() => {
        setShowEyesOpen(false);
      }, 3000); // open eyes images for 3s

      return () => clearTimeout(timeout);
    }, 11000); // 11 = 8sclose + 3sopen eyes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(/images/${showEyesOpen ? "wolf.png" : "wolf1.png"})`,
      }}
    >
      <div className="home-overlay">
        <div className="home-buttons">
          <Link to="/login" className="home-btn">Log in</Link>
          <Link to="/register" className="home-btn">Register</Link>
        </div>
      </div>
    </div>
  );
}
export { Home };