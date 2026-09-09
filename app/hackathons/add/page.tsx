"use client";

import { useState } from "react";

export default function AddHackathonPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fullDescription: "",
    date: "",
    location: "",
    applyLink: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("New Hackathon:", form);

    alert("Hackathon added (check console)");

    // Later → send to backend
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Hackathon</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Short Description"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <textarea
          placeholder="Full Description"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, fullDescription: e.target.value })
          }
        />

        <input
          placeholder="Date"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input
          placeholder="Location"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          placeholder="Apply Link"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, applyLink: e.target.value })
          }
        />

        <button className="bg-blue-600 text-white px-4 py-2">
          Add Hackathon
        </button>
      </form>
    </div>
  );
}