"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
    } catch (error) {
      setMessage((error as Error).message || "Unable to send the reset link.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <section className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-black">Reset password</h1>
        <p className="mt-2 text-sm text-gray-600">Enter your account email and we&apos;ll send a reset link.</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="text-base font-medium text-gray-900">Email address</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-2 flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
          </div>
          {message && <p className="text-sm text-gray-700" role="status">{message}</p>}
          <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50">
            {isLoading ? "Sending..." : "Send reset link"}<ArrowRight className="ml-2" size={16} />
          </button>
        </form>
        <Link href="/auth" className="mt-5 inline-block text-sm font-semibold text-black hover:underline">Back to sign in</Link>
      </section>
    </main>
  );
}
