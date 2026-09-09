"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
      setTimeout(() => router.push("/auth"), 1200);
    } catch (error) {
      setMessage((error as Error).message || "Unable to reset your password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <section className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-black">Choose a new password</h1>
        <p className="mt-2 text-sm text-gray-600">Your new password must contain at least 8 characters.</p>
        {!token ? (
          <p className="mt-6 text-sm text-red-700">This password reset link is invalid. Request a new one.</p>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="new-password" className="text-base font-medium text-gray-900">New password</label>
              <input id="new-password" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-2 flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-base font-medium text-gray-900">Confirm password</label>
              <input id="confirm-password" type="password" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required className="mt-2 flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
            {message && <p className="text-sm text-gray-700" role="status">{message}</p>}
            <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50">
              {isLoading ? "Resetting..." : "Reset password"}<ArrowRight className="ml-2" size={16} />
            </button>
          </form>
        )}
        <Link href="/auth" className="mt-5 inline-block text-sm font-semibold text-black hover:underline">Back to sign in</Link>
      </section>
    </main>
  );
}
