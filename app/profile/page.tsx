"use client";

import { normalizeUrl } from "@/lib/urls";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiAlertCircle, FiCheck, FiEdit2, FiX } from "react-icons/fi";

type ProfileData = {
  fullName: string;
  email: string;
  jobTitle?: string;
  headline?: string;
  bio?: string;
  phone?: string;
  websiteUrl?: string;
  avatarUrl?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    personal?: string;
    instagram?: string;
  };
  location?: {
    country?: string;
    postalCode?: string;
    city?: string;
    state?: string;
  };
};

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

const defaultProfile: ProfileData = {
  fullName: "CollabX Member",
  email: "member@example.com",
  jobTitle: "Professional",
  headline: "Let's build something great",
  bio: "Tell the world who you are.",
  phone: "+91 9999999999",
  websiteUrl: "",
  avatarUrl:
    "https://images.pexels.com/photos/516927/pexels-photo-516927.jpeg?auto=compress&cs=tinysrgb&w=600",
  socials: {},
  location: {
    country: "India",
    postalCode: "000000",
    city: "New Delhi",
    state: "Delhi",
  },
};

function Page() {
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState<{ _id: string } | null>(null);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [formState, setFormState] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
          signal: controller.signal,
        });
        if (!response.ok) {
          router.push("/auth");
          return;
        }
        const data = await response.json();
        setSessionUser({ _id: data.user._id });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          showToast("Unable to load session", "error");
          router.push("/auth");
        }
      }
    };

    void fetchSession();
    return () => controller.abort();
  }, [router]);

  useEffect(() => {
    if (!sessionUser) return;
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${sessionUser._id}`, {
          credentials: "include",
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unable to load profile");
        }
        const nextProfile: ProfileData = {
          fullName: data.user.fullName,
          email: data.user.email,
          jobTitle: data.user.jobTitle,
          headline: data.user.headline,
          bio: data.user.bio,
          phone: data.user.phone,
          websiteUrl: data.user.websiteUrl,
          socials: data.user.socials || {},
          location: {
            country: data.user.location?.country,
            postalCode: data.user.location?.postalCode,
            city: data.user.location?.city,
            state: data.user.location?.state,
          },
        };
        setProfile(nextProfile);
        setFormState(nextProfile);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          showToast((err as Error).message, "error");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchProfile();

    return () => controller.abort();
  }, [sessionUser]);

  const handleFieldChange = (field: keyof ProfileData, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (
    field: keyof NonNullable<ProfileData["location"]>,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      location: { ...(prev.location || {}), [field]: value },
    }));
  };

  const handleSocialChange = (
    field: keyof NonNullable<ProfileData["socials"]>,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      socials: { ...(prev.socials || {}), [field]: value },
    }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sessionUser) return;
    try {
      setSaving(true);

      // Normalize social links to ensure they have protocol
      const normalizedSocials = formState.socials
        ? {
            linkedin: formState.socials.linkedin
              ? normalizeUrl(formState.socials.linkedin)
              : undefined,
            twitter: formState.socials.twitter
              ? normalizeUrl(formState.socials.twitter)
              : undefined,
            personal: formState.socials.personal
              ? normalizeUrl(formState.socials.personal)
              : undefined,
            instagram: formState.socials.instagram
              ? normalizeUrl(formState.socials.instagram)
              : undefined,
          }
        : undefined;

      const response = await fetch(`/api/users/${sessionUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName: formState.fullName,
          jobTitle: formState.jobTitle,
          headline: formState.headline,
          bio: formState.bio,
          phone: formState.phone,
          websiteUrl: formState.websiteUrl,
          location: formState.location,
          socials: normalizedSocials,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to save profile");
      }
      setProfile(formState);
      showToast("Profile updated successfully", "success");
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex flex-col justify-start items-start px-8">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-slideIn ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : toast.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}>
            <div className="flex-shrink-0">
              {toast.type === "success" && <FiCheck className="w-5 h-5" />}
              {toast.type === "error" && <FiAlertCircle className="w-5 h-5" />}
              {toast.type === "info" && <FiAlertCircle className="w-5 h-5" />}
            </div>
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:opacity-70 transition-opacity">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="h-20 w-full flex flex-col justify-center items-start mb-8">
        <div className="w-full flex justify-between items-start">
          <div>
            <p
              style={{ fontFamily: "var(--font-grifter-bold)" }}
              className="text-xl font-semibold text-black/70 mb-2">
              Account Settings
            </p>
            {loading && (
              <p className="text-xs text-gray-500">Loading latest profile…</p>
            )}
          </div>
          <a href="/dashboard-personal">
            <div className="py-[6px] px-5 text-sm rounded-full bg-black/70 cursor-pointer hover:scale-[102%] active:scale-95 transition-all duration-200 ease-in-out text-white/90 flex items-center justify-center">
              Back
            </div>
          </a>
        </div>
        <div className="w-full h-[1px] bg-black/20"></div>
      </div>

      <form
        onSubmit={handleSave}
        className="w-full flex flex-col justify-start items-start gap-6">
        <section className="w-full rounded-xl border border-black/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Image
                src={
                  profile.avatarUrl ||
                  "https://images.pexels.com/photos/516927/pexels-photo-516927.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt="avatar"
                className="h-12 w-12 rounded-full object-cover"
                height={48}
                width={48}
              />
              <div>
                <p className="text-md font-semibold text-black/70">
                  {profile.fullName}
                </p>
                <p className="text-xs text-black/40">{profile.jobTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-black/60">
              <FiEdit2 />
              You can edit your details below
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col text-sm gap-1">
              Full Name
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col text-sm gap-1">
              Job Title
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.jobTitle || ""}
                onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
                placeholder="e.g. Full Stack Developer"
              />
            </label>
            <label className="flex flex-col text-sm gap-1">
              Headline - appears on the front card
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.headline || ""}
                onChange={(e) => handleFieldChange("headline", e.target.value)}
                placeholder="One-line value proposition"
              />
            </label>
            <label className="flex flex-col text-sm gap-1">
              Website
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.websiteUrl || ""}
                onChange={(e) =>
                  handleFieldChange("websiteUrl", e.target.value)
                }
                placeholder="https://"
              />
            </label>
            <label className="flex flex-col text-sm gap-1 col-span-2">
              Bio
              <textarea
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                rows={3}
                value={formState.bio || ""}
                onChange={(e) => handleFieldChange("bio", e.target.value)}
                placeholder="Tell the world about yourself"
              />
            </label>
          </div>
        </section>

        <section className="w-full rounded-xl border border-black/10 p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-semibold">Contact</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col text-sm gap-1">
              Email
              <input
                className="border rounded-md px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
                value={formState.email}
                disabled
              />
            </label>
            <label className="flex flex-col text-sm gap-1">
              Phone
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.phone || ""}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                placeholder="+91 0000000000"
              />
            </label>
            <label className="flex flex-col text-sm gap-1">
              Country
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.location?.country || ""}
                onChange={(e) =>
                  handleLocationChange("country", e.target.value)
                }
              />
            </label>
            <label className="flex flex-col text-sm gap-1">
              City
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.location?.city || ""}
                onChange={(e) => handleLocationChange("city", e.target.value)}
              />
            </label>
            <label className="flex flex-col text-sm gap-1">
              State
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.location?.state || ""}
                onChange={(e) => handleLocationChange("state", e.target.value)}
              />
            </label>
            <label className="flex flex-col text-sm gap-1">
              Postal Code
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.location?.postalCode || ""}
                onChange={(e) =>
                  handleLocationChange("postalCode", e.target.value)
                }
              />
            </label>
          </div>
        </section>

        <section className="w-full rounded-xl border border-black/10 p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-semibold">Social Links</p>
            <p className="text-xs text-gray-500">
              URLs must start with https:// or http://
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col text-sm gap-1">
              LinkedIn
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.socials?.linkedin || ""}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/you"
                type="url"
              />
              {formState.socials?.linkedin &&
                !formState.socials.linkedin.startsWith("http") && (
                  <p className="text-xs text-red-600 mt-1">
                    URL must start with https:// or http://
                  </p>
                )}
            </label>
            <label className="flex flex-col text-sm gap-1">
              Twitter / X
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.socials?.twitter || ""}
                onChange={(e) => handleSocialChange("twitter", e.target.value)}
                placeholder="https://x.com/you"
                type="url"
              />
              {formState.socials?.twitter &&
                !formState.socials.twitter.startsWith("http") && (
                  <p className="text-xs text-red-600 mt-1">
                    URL must start with https:// or http://
                  </p>
                )}
            </label>
            <label className="flex flex-col text-sm gap-1">
              Personal Site
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.socials?.personal || ""}
                onChange={(e) => handleSocialChange("personal", e.target.value)}
                placeholder="https://portfolio.dev"
                type="url"
              />
              {formState.socials?.personal &&
                !formState.socials.personal.startsWith("http") && (
                  <p className="text-xs text-red-600 mt-1">
                    URL must start with https:// or http://
                  </p>
                )}
            </label>
            <label className="flex flex-col text-sm gap-1">
              Instagram
              <input
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                value={formState.socials?.instagram || ""}
                onChange={(e) =>
                  handleSocialChange("instagram", e.target.value)
                }
                placeholder="https://instagram.com/you"
                type="url"
              />
              {formState.socials?.instagram &&
                !formState.socials.instagram.startsWith("http") && (
                  <p className="text-xs text-red-600 mt-1">
                    URL must start with https:// or http://
                  </p>
                )}
            </label>
          </div>
        </section>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}

export default Page;
