"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ======================
   TYPES (MATCH MONGODB)
====================== */
type Project = {
  _id: string;
  name: string;
  domain: string;
  membersNeeded: number;
  description: string;
  authorName: string;
  authorEmail: string;
};

export default function ExploreProjects() {
  const router = useRouter();

  // 🔐 TEMP USER (replace later with real auth)
  const user = {
    name: "Logged User",
    email: "loggedin@user.com",
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    domain: "",
    membersNeeded: 1,
    description: "",
  });

  /* ======================
     LOAD PROJECTS (DB)
  ====================== */
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) =>
        console.error("Failed to load projects:", err)
      );
  }, []);

  /* ======================
     CREATE PROJECT (DB)
  ====================== */
  const createProject = async () => {
    if (!user) return;
    if (!form.name || !form.domain || !form.description) return;

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        domain: form.domain,
        membersNeeded: form.membersNeeded,
        description: form.description,
        authorName: user.name,
        authorEmail: user.email,
      }),
    });

    const savedProject = await res.json();

    setProjects((prev) => [savedProject, ...prev]);
    setForm({ name: "", domain: "", membersNeeded: 1, description: "" });
    setShowForm(false);
  };

  /* ======================
     DELETE PROJECT (DB)
  ====================== */
  const deleteProject = async (id: string) => {
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  /* ======================
     SEARCH FILTER
  ====================== */
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-16 py-12">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Home
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <User size={18} />
          Profile
        </button>
      </div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-12"
      >
        <h1 className="text-5xl font-bold text-[#303030]">
          Explore Projects
        </h1>

        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-[#303030] text-white rounded-lg"
          >
            <Plus size={18} />
            Create Project
          </button>
        )}
      </motion.div>

      {/* SEARCH */}
      <input
        placeholder="Search projects by name or domain..."
        className="w-full mb-10 px-4 py-3 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CREATE PROJECT FORM */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 border p-6 rounded-xl"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Project Name"
              className="border p-3 rounded"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            <input
              placeholder="Domain (AI, Web, SaaS...)"
              className="border p-3 rounded"
              value={form.domain}
              onChange={(e) =>
                setForm({ ...form, domain: e.target.value })
              }
            />
            <input
              type="number"
              min={1}
              placeholder="Members Needed"
              className="border p-3 rounded"
              value={form.membersNeeded}
              onChange={(e) =>
                setForm({
                  ...form,
                  membersNeeded: Number(e.target.value),
                })
              }
            />
          </div>

          <textarea
            placeholder="Project description"
            className="border p-3 rounded w-full mt-4"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            onClick={createProject}
            className="mt-4 bg-[#303030] text-white px-6 py-3 rounded-lg"
          >
            Publish Project
          </button>
        </motion.div>
      )}

      {/* PROJECT LIST */}
      {filteredProjects.length === 0 ? (
        <p className="text-gray-500 text-center">
          No projects found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-xl p-6 relative"
            >
              {user.email === project.authorEmail && (
                <button
                  onClick={() => deleteProject(project._id)}
                  className="absolute top-4 right-4 text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <h2 className="text-2xl font-semibold mb-2">
                {project.name}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                Domain: {project.domain}
              </p>

              <p className="text-sm mb-4">
                Members Needed: {project.membersNeeded}
              </p>

              <p className="text-gray-700 mb-6">
                {project.description}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <User size={16} />
                <span>{project.authorName}</span>
                <a
                  href={`mailto:${project.authorEmail}`}
                  className="text-blue-600 underline ml-2"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
