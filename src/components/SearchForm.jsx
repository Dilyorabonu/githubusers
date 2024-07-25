// src/components/SearchForm.jsx
import React, { useState } from "react";
import { toast } from "sonner";

const SearchForm = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      toast.success;
    } else {
      toast.error("Please enter a username!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Search GitHub username..."
        className="input input-bordered w-full max-w-md rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" className="btn btn-primary ml-2 rounded-lg">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
