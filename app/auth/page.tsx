"use client";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type AuthUser = {
  _id: string;
  fullName: string;
  email: string;
  jobTitle?: string;
  role: string;
};

const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath =
    searchParams.get("returnUrl") ||
    searchParams.get("redirectTo") ||
    "/dashboard-personal";
  const [showSecondForm, setShowSecondForm] = useState<boolean>(false);
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success"
  );
  const [loadingState, setLoadingState] = useState<"idle" | "signup" | "login">(
    "idle"
  );
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
          signal: controller.signal,
        });
        if (!response.ok) {
          setCurrentUser(null);
          return;
        }
        const data = await response.json();
        setCurrentUser(data.user);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setCurrentUser(null);
        }
      }
    };
    void loadSession();
    return () => controller.abort();
  }, []);

  const toggleForm = () => {
    setShowSecondForm(!showSecondForm);
    setFeedback(null);
  };

  type AuthResponse = { token: string; user: AuthUser };

  const persistSession = (payload: AuthResponse) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("collabx_user", JSON.stringify(payload.user));
    }
    setCurrentUser(payload.user);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoadingState("signup");
      setFeedback(null);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create account");
      }

      persistSession(data);
      setFeedbackType("success");
      toast.success("Account created — redirecting…");
      setFeedback("Account created successfully. Redirecting…");
      // Reset form
      setFullName("");
      setSignupEmail("");
      setSignupPassword("");
      setTimeout(() => router.push(redirectPath), 1200);
    } catch (err) {
      setFeedbackType("error");
      const msg = (err as Error).message || "Unable to create account";
      toast.error(msg);
      setFeedback(null);
    } finally {
      setLoadingState("idle");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingState("login");
      setFeedback(null);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to login");
      }

      persistSession(data);
      setFeedbackType("success");
      toast.success("Logged in — redirecting…");
      setFeedback("Logged in successfully. Redirecting…");
      setTimeout(() => router.push(redirectPath), 1200);
    } catch (err) {
      setFeedbackType("error");
      const msg = (err as Error).message || "Unable to login";
      toast.error(msg);
      setFeedback(null);
    } finally {
      setLoadingState("idle");
    }
  };

  return (
    <section className="select-none bg-white min-h-screen">
      <Toaster position="top-right" />

      <div className="flex flex-col lg:flex-row items-center min-h-screen">
        {/* Video Section - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block lg:w-1/2 h-screen">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/assets/video/auth.mp4"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 min-h-screen">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              {showSecondForm ? "Create Account" : "Sign in"}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {showSecondForm ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="font-semibold text-black transition-all duration-200 hover:underline">
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="font-semibold text-black transition-all duration-200 hover:underline">
                    Create a free account
                  </button>
                </>
              )}
            </p>

            {currentUser && (
              <div className="mt-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-xs text-blue-900">
                  Signed in as <strong>{currentUser.fullName}</strong> (
                  {currentUser.email})
                </p>
              </div>
            )}

            {feedback && (
              <div
                className={`mt-4 rounded-md border px-3 py-2 text-sm ${
                  feedbackType === "success"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-red-300 bg-red-50 text-red-900"
                }`}>
                {feedback}
              </div>
            )}

            {showSecondForm ? (
              <form onSubmit={handleSignUpSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="signup-name"
                      className="text-base font-medium text-gray-900">
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Full Name"
                        id="signup-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="signup-email"
                      className="text-base font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="signup-email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="signup-password"
                      className="text-base font-medium text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password (min. 8 characters)"
                        id="signup-password"
                        minLength={8}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      disabled={loadingState === "signup"}>
                      {loadingState === "signup"
                        ? "Creating..."
                        : "Create Account"}
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="login-email"
                      className="text-base font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="login-email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="login-password"
                        className="text-base font-medium text-gray-900">
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="login-password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      disabled={loadingState === "login"}>
                      {loadingState === "login"
                        ? "Signing in..."
                        : "Get started"}
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
