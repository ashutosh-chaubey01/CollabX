"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateHackathon() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    domain: "",
    members: "",
    description: "",
    fullDescription: "",
    date: "",
    location: "",
    applyLink: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl = "";

    // 🔥 Upload image first
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      imageUrl = data.url;
    }

    // 🔥 Save hackathon
    await fetch("/api/hackathons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        image: imageUrl,
      }),
    });

    router.push("/hackathons");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Hackathon</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* 🔥 IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {/* 🔥 IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover rounded"
          />
        )}

        {/* 🔥 FORM INPUTS */}
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

        <button className="bg-black text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}