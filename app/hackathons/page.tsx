"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data
  useEffect(() => {
    fetch("/api/hackathons")
      .then((res) => res.json())
      .then((data) => setHackathons(data));
  }, []);

  // Filter
  const filtered = hackathons.filter((h: any) =>
    h.title.toLowerCase().includes(search.toLowerCase()) ||
    h.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Explore Hackathons</h1>

        <Link
          href="/hackathons/create"
          className="px-5 py-2 bg-black text-white rounded-lg"
        >
          + Create Hackathon
        </Link>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search hackathons..."
        className="w-full border p-3 rounded-lg mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      <div className="space-y-6">
        {filtered.map((hack: any) => (
          <div
            key={hack._id}
            className="border p-6 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold">{hack.title}</h2>

            <p className="text-gray-500">Domain: {hack.domain}</p>
            <p>Team Size: {hack.members}</p>

            <p className="mt-3 text-gray-700">{hack.description}</p>

            <div className="flex gap-4 mt-4">
              <Link
                href={`/hackathons/${hack._id}`}
                className="text-blue-600 underline"
              >
                View Details
              </Link>

              <a
                href={hack.applyLink}
                target="_blank"
                className="px-4 py-1 bg-black text-white rounded"
              >
                Apply
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}