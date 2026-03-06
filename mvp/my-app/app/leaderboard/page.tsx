'use client';

import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Award, 
  Globe, 
  FileText, 
  Code, 
  Sitemap,
  ChevronRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

// Leaderboard data from our audits
const leaderboardData = [
  { rank: 1, site: 'ElevenLabs', url: 'elevenlabs.io', score: 79, grade: 'B', category: 'Agent-Ready', hasLLMsTxt: true, hasOpenAPI: true, hasSitemap: true, hasRobots: true },
  { rank: 2, site: 'Linear', url: 'linear.app', score: 76, grade: 'B', category: 'Agent-Ready', hasLLMsTxt: true, hasOpenAPI: true, hasSitemap: true, hasRobots: true },
  { rank: 3, site: 'Cloudflare Devs', url: 'developers.cloudflare.com', score: 69, grade: 'C', category: 'Agent-Compatible', hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: true },
  { rank: 4, site: 'Vercel', url: 'vercel.com', score: 65, grade: 'C', category: 'Agent-Compatible', hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: true },
  { rank: 5, site: 'Supabase', url: 'supabase.com', score: 65, grade: 'C', category: 'Agent-Compatible', hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: true, hasRobots: true },
  { rank: 6, site: 'Next.js', url: 'nextjs.org', score: 63, grade: 'C', category: 'Agent-Compatible', hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: true, hasRobots: false },
  { rank: 7, site: 'Stripe Docs', url: 'docs.stripe.com', score: 63, grade: 'C', category: 'Agent-Compatible', hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: false },
  { rank: 8, site: 'GitHub', url: 'github.com', score: 62, grade: 'C', category: 'Agent-Compatible', hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: true },
  { rank: 9, site: 'shadcn/ui', url: 'ui.shadcn.com', score: 59, grade: 'D', category: 'Agent-Challenged', hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: false },
  { rank: 10, site: 'LangChain', url: 'python.langchain.com', score: 58, grade: 'D', category: 'Agent-Challenged', hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: false, hasRobots: false },
  { rank: 11, site: 'MDN', url: 'developer.mozilla.org', score: 57, grade: 'D', category: 'Agent-Challenged', hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: true, hasRobots: true },
  { rank: 12, site: 'Vercel AI SDK', url: 'sdk.vercel.ai', score: 54, grade: 'D', category: 'Agent-Challenged', hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: false, hasRobots: false },
  { rank: 13, site: 'Tailwind CSS', url: 'tailwindcss.com', score: 51, grade: 'D', category: 'Agent-Challenged', hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: false, hasRobots: false },
  { rank: 14, site: 'Anthropic', url: 'anthropic.com', score: 51, grade: 'D', category: 'Agent-Challenged', hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: false, hasRobots: false },
  { rank: 15, site: 'OpenAI', url: 'openai.com', score: 41, grade: 'F', category: 'Agent-Opaque', hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: true, hasRobots: true },
];

const gradeColors: Record<string, string> = {
  'A+': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'A': 'text-emerald-300 bg-emerald-300/10 border-emerald-300/20',
  'B': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'C': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'D': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'F': 'text-red-400 bg-red-400/10 border-red-400/20',
};

const rankIcons = [
  <Trophy key={1} className="w-6 h-6 text-yellow-400" />,
  <Medal key={2} className="w-6 h-6 text-slate-300" />,
  <Medal key={3} className="w-6 h-6 text-amber-600" />,
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                AI Findability
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Audit
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              <Trophy className="w-4 h-4" />
              <span>Live Rankings</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Agent Accessibility
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {" "}Leaderboard
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Real-world A3 Framework scores for major tech companies. 
              See who&apos;s actually agent-ready versus who just talks about AI.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{leaderboardData.length}</div>
              <div className="text-sm text-slate-500">Sites Audited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">
                {leaderboardData.filter(s => s.score >= 70).length}
              </div>
              <div className="text-sm text-slate-500">Agent-Ready (B+)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">
                {leaderboardData.filter(s => s.score >= 60 && s.score < 70).length}
              </div>
              <div className="text-sm text-slate-500">Agent-Compatible (C)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">
                {leaderboardData.filter(s => s.score < 60).length}
              </div>
              <div className="text-sm text-slate-500">Need Improvement (D/F)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-800/50 text-sm font-medium text-slate-400 border-b border-slate-800">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3">Site</div>
            <div className="col-span-2 text-center">Grade</div>
            <div className="col-span-1 text-center">Score</div>
            <div className="col-span-5 hidden md:grid grid-cols-4 gap-2">
              <div className="text-center" title="llms.txt">
                <FileText className="w-4 h-4 mx-auto" />
              </div>
              <div className="text-center" title="OpenAPI">
                <Code className="w-4 h-4 mx-auto" />
              </div>
              <div className="text-center" title="Sitemap">
                <Sitemap className="w-4 h-4 mx-auto" />
              </div>
              <div className="text-center" title="Robots.txt">
                <Globe className="w-4 h-4 mx-auto" />
              </div>
            </div>
          </div>

          {/* Table Rows */}
          {leaderboardData.map((site, index) => (
            <motion.div
              key={site.site}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors items-center"
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center gap-2">
                {site.rank <= 3 ? (
                  rankIcons[site.rank - 1]
                ) : (
                  <span className="text-slate-500 font-mono">#{site.rank}</span>
                )}
              </div>

              {/* Site */}
              <div className="col-span-3">
                <div className="font-medium text-slate-200">{site.site}</div>
                <div className="text-sm text-slate-500">{site.url}</div>
              </div>

              {/* Grade */}
              <div className="col-span-2 text-center">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold border ${gradeColors[site.grade]}`}>
                  {site.grade}
                </span>
                <div className="text-xs text-slate-500 mt-1">{site.category}</div>
              </div>

              {/* Score */}
              <div className="col-span-1 text-center">
                <div className={`text-lg font-bold ${
                  site.score >= 70 ? 'text-cyan-400' :
                  site.score >= 60 ? 'text-amber-400' :
                  site.score >= 50 ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {site.score}
                </div>
              </div>

              {/* Features */}
              <div className="col-span-5 hidden md:grid grid-cols-4 gap-2">
                <div className="text-center">
                  {site.hasLLMsTxt ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">✓</span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-600 text-xs">−</span>
                  )}
                </div>
                <div className="text-center">
                  {site.hasOpenAPI ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">✓</span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-600 text-xs">−</span>
                  )}
                </div>
                <div className="text-center">
                  {site.hasSitemap ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">✓</span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-600 text-xs">−</span>
                  )}
                </div>
                <div className="text-center">
                  {site.hasRobots ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">✓</span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-600 text-xs">−</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              Grade Legend
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${gradeColors['A+']}`}>A+</span>
                <span className="text-slate-400">Agent-Native (90-100)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${gradeColors['A']}`}>A</span>
                <span className="text-slate-400">Agent-Optimized (80-89)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${gradeColors['B']}`}>B</span>
                <span className="text-slate-400">Agent-Ready (70-79)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${gradeColors['C']}`}>C</span>
                <span className="text-slate-400">Agent-Compatible (60-69)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${gradeColors['D']}`}>D</span>
                <span className="text-slate-400">Agent-Challenged (50-59)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${gradeColors['F']}`}>F</span>
                <span className="text-slate-400">Agent-Opaque (0-49)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Key Insights
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Only <strong className="text-slate-200">2 of 15</strong> sites are Agent-Ready (B+)</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span><strong className="text-slate-200">ElevenLabs</strong> leads with perfect Agent Discovery & Programmatic Access</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span><strong className="text-slate-200">OpenAI</strong> scores F (41) — the company that created GPT has an agent-opaque website</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Only <strong className="text-slate-200">53%</strong> of sites have llms.txt</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Where does your site rank?
            </h2>
            <p className="text-slate-400 mb-6">
              Get your A3 Framework score and see how you compare to the leaders.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              Run Free Audit
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
