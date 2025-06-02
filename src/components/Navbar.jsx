import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbarStyles.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">🏠 Home</Link>

      {user ? (
        <>
          <Link to="/dashboard">📊 Dashboard</Link>
          <span className="user">👤 {user.email}</span>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">🔐 Login</Link>
          <Link to="/register">📝 Register</Link>
        </>
      )}
    </nav>
  );
}
