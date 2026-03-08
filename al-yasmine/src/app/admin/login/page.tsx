"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router  = useRouter();
  const [input,   setInput]   = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password: input }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Incorrect password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="bg-brand-dark rounded-3xl p-10 w-full max-w-sm flex flex-col gap-5">
        <div>
          <p className="font-display text-2xl text-brand-cream font-light mb-1">Admin Access</p>
          <p className="text-brand-cream/40 text-xs">Al Yasmine Center</p>
        </div>

        <input
          type="password"
          placeholder="Password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          disabled={loading}
          className="px-4 py-3 rounded-xl bg-brand-dark border border-brand-cream/10 text-brand-cream text-sm placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-teal/50 disabled:opacity-50"
        />

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading || !input.trim()}
          className="px-5 py-3 bg-brand-teal text-brand-cream rounded-xl text-sm font-medium hover:bg-brand-teal/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Checking…" : "Enter"}
        </button>

        <Link href="/" className="text-xs text-brand-cream/30 hover:text-brand-cream/60 text-center transition-colors">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
