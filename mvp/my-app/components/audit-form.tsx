"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuditForm() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate URL
    let validatedUrl = url.trim();
    if (!validatedUrl.startsWith("http")) {
      validatedUrl = `https://${validatedUrl}`;
    }

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: validatedUrl, email: email.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to analyze website");
      }

      const data = await response.json();
      
      // Store audit ID in localStorage for retrieval
      localStorage.setItem("lastAuditId", data.auditId);
      
      // Redirect to results page
      router.push(`/audit/${data.auditId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-lg ring-1 ring-slate-900/5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-slate-900 dark:text-white"
          >
            Website URL
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="url"
              placeholder="example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="block w-full rounded-xl border-0 px-4 py-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-700"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-900 dark:text-white"
          >
            Email (for your audit report)
          </label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-xl border-0 px-4 py-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-700"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing...
            </>
          ) : (
            "Get Free AI Findability Audit"
          )}
        </button>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Free audit includes: AI-readability score, competitor comparison, and prioritized action plan.
        </p>
      </form>
    </div>
  );
}
