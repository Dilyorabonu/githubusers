// src/components/UserCard.jsx
import React from "react";
import { FaTwitter, FaLink } from "react-icons/fa";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="card bg-base-100 shadow-xl mt-6 p-6 rounded-lg max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:space-x-6">
        <img
          src={user.avatar_url}
          alt="avatar"
          className="w-24 h-24 rounded-full"
        />
        <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
          <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
          <p className="text-blue-500">@{user.login}</p>
          <p className="mt-2 text-center md:text-left">
            {user.bio || "This profile has no bio"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Joined {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="font-bold">{user.public_repos}</p>
          <p className="text-gray-500">Repos</p>
        </div>
        <div>
          <p className="font-bold">{user.followers}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div>
          <p className="font-bold">{user.following}</p>
          <p className="text-gray-500">Following</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <FaLocationDot className="w-5 h-5 text-gray-500" />
          <span>{user.location || "Not Available"}</span>
        </div>
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <FaLink className="w-5 h-5 text-gray-500" />
          <a
            href={user.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {user.blog || "Not Available"}
          </a>
        </div>
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <FaTwitter className="w-5 h-5 text-gray-500" />
          <span>
            {user.twitter_username
              ? `@${user.twitter_username}`
              : "Not Available"}
          </span>
        </div>
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <HiMiniBuildingOffice2 className="w-5 h-5 text-gray-500" />
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {user.html_url || "Not Available"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
