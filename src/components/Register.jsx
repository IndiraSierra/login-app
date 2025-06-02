import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/loginRegisterStyles.css";
import useWolfEyes from "../utils/functions.js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const showEyesOpen = useWolfEyes();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== repeatPassword) {
      return setErrorMsg("Passwords do not match.");
    }

    if (!email || !password) {
      return setErrorMsg("All fields are required.");
    }

    if (!isValidEmail(email)) {
      return setErrorMsg("Introduce a valid email.");
    }

    if (password.length < 6) {
      return setErrorMsg("Password must be at least 6 characters.");
    }

    try {
      await register(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg("Error at register: " + error.message);
    }
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(/images/${showEyesOpen ? "wolf.png" : "wolf1.png"})`,
      }}
    >
      <form id="register-form" className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
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
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          type="password"
          placeholder="Repeat your password"
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
