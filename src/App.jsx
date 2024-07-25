// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import UserCard from "./components/UserCard";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const fetchUser = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("User not found");
      setUser(null);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <div className="container mx-auto p-4">
        <SearchForm onSearch={fetchUser} />
        <UserCard user={user} />
      </div>
    </div>
  );
};

export default App;
