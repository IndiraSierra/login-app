import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/loginRegisterStyles.css";
import useWolfEyes from "../utils/functions.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      return setErrorMsg("All fields are required.");
    }

    if (!isValidEmail(email)) {
      return setErrorMsg("Introduce a valid email.");
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg("Email or password incorrect.");
    }
  };

  return (
    <div className="home-container"
      style={{
        backgroundImage: `url(/images/${useWolfEyes() ? "wolf.png" : "wolf1.png"})`,
      }} >
      <form id="login-form" className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMsg && <p className="auth-error">{errorMsg}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>
    </div>

  );
}
