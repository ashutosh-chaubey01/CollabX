"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "./FriendCard/card";

type Friend = {
  _id: string;
  fullName: string;
  jobTitle?: string;
  slug: string;
  avatarUrl?: string;
  bio?: string;
};

function Friends() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const loadFriends = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/friends", {
          credentials: "include",
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch friends");
        }
        console.log("Friends loaded:", data.friends);
        setFriends(data.friends);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error loading friends:", err);
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    void loadFriends();

    return () => controller.abort();
  }, [refetchTrigger]);

  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focused, refetching friends...");
      setRefetchTrigger((prev) => prev + 1);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const filteredFriends = useMemo(() => {
    if (!search) return friends;
    const term = search.toLowerCase();
    return friends.filter(
      (friend) =>
        friend.fullName.toLowerCase().includes(term) ||
        friend.jobTitle?.toLowerCase().includes(term)
    );
  }, [friends, search]);

  return (
    <main className="h-screen w-full flex flex-col items-center justify-start overflow-hidden px-5">
      <div
        style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
        className="w-full h-full overflow-y-scroll flex flex-col items-center">
        <div className="flex flex-col items-start justify-start h-[220px] w-full px-5">
          <p
            style={{ fontFamily: "var(--font-grifter-bold)" }}
            className="text-6xl font-semibold text-black/60 pb-2">
            Your network
          </p>
          <p className="text-black/50 text-sm">
            Share your link and grow your CollabX friends list.
          </p>
        </div>
        <div className="sticky w-full top-0 z-10 backdrop-blur-lg px-5 py-3">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search friends by name or role"
            className="w-full h-[60px] px-3 rounded-lg bg-white/70 border border-black/10 placeholder:font-medium placeholder:text-lg placeholder-black/40 text-xl font-medium focus:ring-0"
          />
        </div>
        <div className="w-full max-w-[1200px] px-5 mb-5">
          {loading && (
            <p className="text-sm text-black/40">Loading your friends…</p>
          )}
          {error && (
            <p className="text-sm text-red-500">
              {error}. Refresh to try again.
            </p>
          )}
        </div>
        <div className="grid auto-rows-max grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-[1200px] px-5 place-content-center mb-5">
          {filteredFriends.length === 0 && !loading ? (
            <p className="text-sm text-black/40 col-span-full text-center">
              {search
                ? "No friends match your search."
                : "You haven’t added anyone yet. Share your card to connect!"}
            </p>
          ) : (
            filteredFriends.map((friend) => (
              <Card
                key={friend._id}
                image={
                  friend.avatarUrl ||
                  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
                name={friend.fullName}
                title={friend.jobTitle}
                slug={friend.slug}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Friends;
