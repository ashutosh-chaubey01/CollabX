"use client";

import React, { useEffect, useState } from "react";
import Card from "@/models/Card";
import Link from "next/link";

interface Friend {
  _id: string;
  fullName: string;
  jobTitle?: string;
  slug: string;
  avatarUrl?: string;
  bio?: string;
}

function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch("/api/friends");

      if (!response.ok) {
        if (response.status === 401) {
          setError("Please sign in to view your friends");
          return;
        }
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch friends");
      }

      const data = await response.json();
      setFriends(data.friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        {error.includes("sign in") && (
          <Link
            href="/login"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        )}
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-24 w-24 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-gray-500 text-lg mb-2 font-medium">
          No friends added yet
        </p>
        <p className="text-gray-400 text-sm">
          Start connecting with people to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          My Friends
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({friends.length})
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {friends.map((friend) => (
          <Card
            key={friend._id}
            image={friend.avatarUrl || "/default-avatar.png"}
            name={friend.fullName}
            title={friend.jobTitle}
            slug={friend.slug}
          />
        ))}
      </div>
    </div>
  );
}

export default FriendsList;
