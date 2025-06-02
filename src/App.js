import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Home from "./components/Home";
import ApiChuckNorris from "./components/api/ApiChuckNorris";
import Favorites from "./components/Favorites";
import ApiRecipes from "./components/api/ApiRecipes";
import RecipeDetails from "./components/api/RecipeDetails";
import ApiAdvice from "./components/api/ApiAdvice";
import ApiBored from "./components/api/ApiBored";


function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/jokes" element={
          <PrivateRoute>
            <ApiChuckNorris />
          </PrivateRoute>
        } />
        <Route path="/favorites" element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        } />
        <Route path="/recipes" element={
          <PrivateRoute>
            <ApiRecipes />
          </PrivateRoute>
        }
        />
        <Route path="/recipes/:id" element={
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        }
        />
        <Route path="/advice" element={
          <PrivateRoute>
            <ApiAdvice />
          </PrivateRoute>
        }
        />
        <Route path="/bored" element={
          <PrivateRoute>
            <ApiBored />
          </PrivateRoute>
        }
        />


      </Routes>
    </Router>
  );
}

export default App;
