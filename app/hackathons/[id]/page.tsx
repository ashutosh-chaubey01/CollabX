import { connectToDatabase } from "@/lib/db";
import Hackathon from "@/models/Hackathon";
import { notFound } from "next/navigation";

export default async function HackathonDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  await connectToDatabase();

  const hackathon = await Hackathon.findById(params.id);

  if (!hackathon) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HERO SECTION */}
      <div className="w-full h-[300px] bg-black relative">
        {hackathon.image && (
          <img
          
            src={hackathon.image}
            className="w-full h-full object-cover opacity-70"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            {hackathon.title}
          </h1>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-5xl mx-auto p-6">

        {/* Info Row */}
        <div className="flex flex-wrap gap-6 text-gray-600 text-sm mb-6">
          <span><strong>Domain:</strong> {hackathon.domain}</span>
          <span><strong>Team Size:</strong> {hackathon.members}</span>
          <span><strong>Date:</strong> {hackathon.date}</span>
          <span><strong>Location:</strong> {hackathon.location}</span>
        </div>

        {/* Description Card */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-semibold mb-3">About Hackathon</h2>
          <p className="text-gray-700 leading-relaxed">
            {hackathon.fullDescription}
          </p>
        </div>

        {/* Apply Section */}
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow">
          <div>
            <h3 className="text-xl font-semibold">Ready to participate?</h3>
            <p className="text-gray-500 text-sm">
              Apply now and showcase your skills 🚀
            </p>
          </div>

          <a
            href={hackathon.applyLink}
            target="_blank"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Apply Now →
          </a>
        </div>

      </div>
    </div>
  );
}