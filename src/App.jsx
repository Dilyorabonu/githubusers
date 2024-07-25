// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import UserCard from "./components/UserCard";
import BarChart from "./components/BarChart";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [languagesData, setLanguagesData] = useState([]);
  const [languagesCategories, setLanguagesCategories] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchLanguages(userData.login);
    }
  }, []);

  const fetchUser = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      fetchLanguages(username);
    } catch (error) {
      console.error("User not found");
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const fetchLanguages = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const repos = response.data;
      const languageCounts = {};
      for (const repo of repos) {
        if (repo.language) {
          languageCounts[repo.language] =
            (languageCounts[repo.language] || 0) + 1;
        }
      }
      const data = Object.values(languageCounts);
      const categories = Object.keys(languageCounts);
      setLanguagesData(data);
      setLanguagesCategories(categories);
    } catch (error) {
      console.error("Repos not found");
      setLanguagesData([]);
      setLanguagesCategories([]);
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
        {user && languagesData.length > 0 && (
          <BarChart data={languagesData} categories={languagesCategories} />
        )}
      </div>
    </div>
  );
};

export default App;
