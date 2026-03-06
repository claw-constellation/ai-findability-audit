import { AuditForm } from "@/components/audit-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            AI Findability Audit
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            69% of searches end without a click. Is your business visible to AI answer engines like Perplexity, ChatGPT, and Google AI Overviews?
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-900/5">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">69%</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Zero-click searches</div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-900/5">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">60%</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Google AI Overview coverage</div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-900/5">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">$82B</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">AI marketing market by 2030</div>
          </div>
        </div>

        {/* Audit Form */}
        <div className="mt-16">
          <AuditForm />
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
            How It Works
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold">
                1
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Analyze</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                We crawl your website and analyze its AI-readability using the same tools AI answer engines use.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold">
                2
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Score</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Get a detailed score on semantic structure, schema markup, and competitor comparison.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold">
                3
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Fix</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Receive a prioritized action plan to make your site discoverable by AI systems.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Built for the AI-first web. Making businesses discoverable to the next generation of search.</p>
        </footer>
      </main>
    </div>
  );
}
