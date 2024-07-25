// src/components/MoreStats.jsx
import React from "react";
import { Link } from "react-router-dom";
import BarChart from "./BarChart";
import UserCard from "./UserCard"; // Import the UserCard component

const MoreStats = ({ user, languagesData, languagesCategories }) => {
  if (!user) return null;

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to home
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/3">
          <UserCard user={user} /> {/* Use the UserCard component */}
        </div>
        <div className="md:w-2/3 mt-4 md:mt-0">
          <BarChart data={languagesData} categories={languagesCategories} />
        </div>
      </div>
    </div>
  );
};

export default MoreStats;
