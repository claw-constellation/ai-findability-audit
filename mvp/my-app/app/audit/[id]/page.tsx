"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface AuditData {
  id: string;
  url: string;
  email: string;
  createdAt: string;
  status: string;
  analysis: {
    scores: {
      overall: number;
      tokenEfficiency: number;
      semanticStructure: number;
      contentClarity: number;
      schemaMarkup: number;
    };
    recommendations: Array<{
      priority: string;
      category: string;
      title: string;
      description: string;
      impact: string;
    }>;
    summary: string;
    pageCount: number;
    wordCount: number;
  };
}

export default function AuditResultsPage() {
  const params = useParams();
  const [audit, setAudit] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await fetch(`/api/audit?id=${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to load audit");
        }
        const data = await response.json();
        setAudit(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load audit");
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading your audit...</p>
        </div>
      </div>
    );
  }

  if (error || !audit) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error || "Audit not found"}</p>
          <Link href="/" className="mt-4 text-indigo-600 hover:text-indigo-500">
            Start new audit
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 50) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            ← Back to home
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            AI Findability Audit Results
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {audit.url}
          </p>
        </div>

        {/* Overall Score */}
        <div className="rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-lg ring-1 ring-slate-900/5 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Overall AI-Readability Score
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl">
                {audit.analysis.summary}
              </p>
            </div>
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-2xl ${getScoreBg(
                audit.analysis.scores.overall
              )}`}
            >
              <span
                className={`text-4xl font-bold ${getScoreColor(
                  audit.analysis.scores.overall
                )}`}
              >
                {audit.analysis.scores.overall}
              </span>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {audit.analysis.pageCount} page analyzed • {audit.analysis.wordCount.toLocaleString()} words
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-900/5">
            <div className="text-sm text-slate-600 dark:text-slate-400">Token Efficiency</div>
            <div className={`mt-2 text-2xl font-bold ${getScoreColor(audit.analysis.scores.tokenEfficiency)}`}>
              {audit.analysis.scores.tokenEfficiency}/100
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              HTML-to-content ratio
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-900/5">
            <div className="text-sm text-slate-600 dark:text-slate-400">Semantic Structure</div>
            <div className={`mt-2 text-2xl font-bold ${getScoreColor(audit.analysis.scores.semanticStructure)}`}>
              {audit.analysis.scores.semanticStructure}/100
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Heading hierarchy & organization
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-900/5">
            <div className="text-sm text-slate-600 dark:text-slate-400">Content Clarity</div>
            <div className={`mt-2 text-2xl font-bold ${getScoreColor(audit.analysis.scores.contentClarity)}`}>
              {audit.analysis.scores.contentClarity}/100
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Readability & key information
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-900/5">
            <div className="text-sm text-slate-600 dark:text-slate-400">Schema Markup</div>
            <div className={`mt-2 text-2xl font-bold ${getScoreColor(audit.analysis.scores.schemaMarkup)}`}>
              {audit.analysis.scores.schemaMarkup}/100
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Structured data presence
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-lg ring-1 ring-slate-900/5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Prioritized Recommendations
          </h2>
          <div className="space-y-4">
            {audit.analysis.recommendations.map((rec, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-r-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(
                          rec.priority
                        )}`}
                      >
                        {rec.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {rec.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {rec.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {rec.description}
                    </p>
                    <p className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">
                      Impact: {rec.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl bg-indigo-600 p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            Want us to fix these issues for you?
          </h2>
          <p className="mt-2 text-indigo-100">
            Our team can implement all recommendations and make your site fully AI-ready.
          </p>
          <button className="mt-4 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">
            Get a Quote
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>
            Audit generated on {new Date(audit.createdAt).toLocaleDateString()}
          </p>
        </footer>
      </main>
    </div>
  );
}
