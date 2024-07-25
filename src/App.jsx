// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import UserCard from "./components/UserCard"; // Import UserCard
import MoreStats from "./components/MoreStats"; // Import MoreStats
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
      toast.success(`User ${username} fetched successfully!`);
    } catch (error) {
      console.error("User not found");
      setUser(null);
      localStorage.removeItem("user");
      toast.error(`User ${username} not found!`);
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
    <Router>
      <div className="min-h-screen bg-base-200 text-base-content">
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Toaster position="bottom-center" />
        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchForm onSearch={fetchUser} />
                  <UserCard user={user} />
                  {user && (
                    <Link
                      to="/more-stats"
                      className="text-blue-500 hover:underline mt-4 block text-center"
                    >
                      View more statistics
                    </Link>
                  )}
                </>
              }
            />
            <Route
              path="/more-stats"
              element={
                <MoreStats
                  user={user}
                  languagesData={languagesData}
                  languagesCategories={languagesCategories}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
