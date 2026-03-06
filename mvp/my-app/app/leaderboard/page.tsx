'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Award, 
  Scan,
  Globe, 
  FileText, 
  Code, 
  Map,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  site: string;
  url: string;
  score: number;
  grade: string;
  category: string;
  // A3 Framework: Five Pillars
  machineReadability: number;
  semanticDepth: number;
  agentDiscovery: number;
  programmaticAccess: number;
  contextEfficiency: number;
  // Feature flags
  hasLLMsTxt: boolean;
  hasOpenAPI: boolean;
  hasSitemap: boolean;
  hasRobots: boolean;
  createdAt: string;
}

// Default seed data (shown while loading or if API fails)
const seedData: LeaderboardEntry[] = [
  { rank: 1, site: 'ElevenLabs', url: 'elevenlabs.io', score: 79, grade: 'B', category: 'Agent-Ready', machineReadability: 18, semanticDepth: 12, agentDiscovery: 20, programmaticAccess: 20, contextEfficiency: 9, hasLLMsTxt: true, hasOpenAPI: true, hasSitemap: true, hasRobots: true, createdAt: new Date().toISOString() },
  { rank: 2, site: 'Linear', url: 'linear.app', score: 76, grade: 'B', category: 'Agent-Ready', machineReadability: 18, semanticDepth: 12, agentDiscovery: 20, programmaticAccess: 18, contextEfficiency: 8, hasLLMsTxt: true, hasOpenAPI: true, hasSitemap: true, hasRobots: true, createdAt: new Date().toISOString() },
  { rank: 3, site: 'Cloudflare Devs', url: 'developers.cloudflare.com', score: 69, grade: 'C', category: 'Agent-Compatible', machineReadability: 18, semanticDepth: 12, agentDiscovery: 17, programmaticAccess: 11, contextEfficiency: 11, hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: true, createdAt: new Date().toISOString() },
  { rank: 4, site: 'Vercel', url: 'vercel.com', score: 65, grade: 'C', category: 'Agent-Compatible', machineReadability: 18, semanticDepth: 12, agentDiscovery: 15, programmaticAccess: 11, contextEfficiency: 9, hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: true, createdAt: new Date().toISOString() },
  { rank: 5, site: 'Supabase', url: 'supabase.com', score: 65, grade: 'C', category: 'Agent-Compatible', machineReadability: 18, semanticDepth: 10, agentDiscovery: 16, programmaticAccess: 13, contextEfficiency: 8, hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: true, hasRobots: true, createdAt: new Date().toISOString() },
  { rank: 6, site: 'Next.js', url: 'nextjs.org', score: 63, grade: 'C', category: 'Agent-Compatible', machineReadability: 18, semanticDepth: 10, agentDiscovery: 13, programmaticAccess: 13, contextEfficiency: 9, hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: true, hasRobots: false, createdAt: new Date().toISOString() },
  { rank: 7, site: 'Stripe Docs', url: 'docs.stripe.com', score: 63, grade: 'C', category: 'Agent-Compatible', machineReadability: 18, semanticDepth: 10, agentDiscovery: 12, programmaticAccess: 13, contextEfficiency: 10, hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: false, createdAt: new Date().toISOString() },
  { rank: 8, site: 'GitHub', url: 'github.com', score: 62, grade: 'C', category: 'Agent-Compatible', machineReadability: 18, semanticDepth: 10, agentDiscovery: 13, programmaticAccess: 10, contextEfficiency: 11, hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: true, createdAt: new Date().toISOString() },
  { rank: 9, site: 'shadcn/ui', url: 'ui.shadcn.com', score: 59, grade: 'D', category: 'Agent-Challenged', machineReadability: 18, semanticDepth: 10, agentDiscovery: 10, programmaticAccess: 10, contextEfficiency: 11, hasLLMsTxt: true, hasOpenAPI: false, hasSitemap: false, hasRobots: false, createdAt: new Date().toISOString() },
  { rank: 10, site: 'LangChain', url: 'python.langchain.com', score: 58, grade: 'D', category: 'Agent-Challenged', machineReadability: 18, semanticDepth: 12, agentDiscovery: 4, programmaticAccess: 13, contextEfficiency: 11, hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: false, hasRobots: false, createdAt: new Date().toISOString() },
  { rank: 11, site: 'MDN', url: 'developer.mozilla.org', score: 57, grade: 'D', category: 'Agent-Challenged', machineReadability: 18, semanticDepth: 10, agentDiscovery: 8, programmaticAccess: 10, contextEfficiency: 11, hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: true, hasRobots: true, createdAt: new Date().toISOString() },
  { rank: 12, site: 'Vercel AI SDK', url: 'sdk.vercel.ai', score: 54, grade: 'D', category: 'Agent-Challenged', machineReadability: 18, semanticDepth: 10, agentDiscovery: 4, programmaticAccess: 11, contextEfficiency: 11, hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: false, hasRobots: false, createdAt: new Date().toISOString() },
  { rank: 13, site: 'Tailwind CSS', url: 'tailwindcss.com', score: 51, grade: 'D', category: 'Agent-Challenged', machineReadability: 18, semanticDepth: 10, agentDiscovery: 2, programmaticAccess: 11, contextEfficiency: 10, hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: false, hasRobots: false, createdAt: new Date().toISOString() },
  { rank: 14, site: 'Anthropic', url: 'anthropic.com', score: 51, grade: 'D', category: 'Agent-Challenged', machineReadability: 18, semanticDepth: 10, agentDiscovery: 4, programmaticAccess: 10, contextEfficiency: 9, hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: false, hasRobots: false, createdAt: new Date().toISOString() },
  { rank: 15, site: 'OpenAI', url: 'openai.com', score: 41, grade: 'F', category: 'Agent-Opaque', machineReadability: 12, semanticDepth: 8, agentDiscovery: 8, programmaticAccess: 3, contextEfficiency: 10, hasLLMsTxt: false, hasOpenAPI: false, hasSitemap: true, hasRobots: true, createdAt: new Date().toISOString() },
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
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(seedData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/audit?leaderboard=true');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const data = await response.json();
        if (data.entries && data.entries.length > 0) {
          setLeaderboardData(data.entries);
        }
      } catch (err) {
        setError('Using cached data - live updates unavailable');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <Scan className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
                AIFA
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/methodology" 
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Methodology
              </Link>
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
              {loading && <Loader2 className="w-3 h-3 animate-spin" />}
            </div>
            {error && (
              <div className="text-sm text-amber-400 mb-4">{error}</div>
            )}
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

      {/* A3 Framework Legend */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-400 mb-4">A3 Framework: Five Pillars</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-slate-300">Machine-Readability</span>
              <span className="text-slate-500 text-xs">/20</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-400" />
              <span className="text-slate-300">Semantic Depth</span>
              <span className="text-slate-500 text-xs">/25</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-slate-300">Agent Discovery</span>
              <span className="text-slate-500 text-xs">/20</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-slate-300">Programmatic Access</span>
              <span className="text-slate-500 text-xs">/20</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="text-slate-300">Context Efficiency</span>
              <span className="text-slate-500 text-xs">/15</span>
            </div>
          </div>
          
          {/* Feature Icons Legend */}
          <div className="border-t border-slate-800 pt-4">
            <h4 className="text-sm font-medium text-slate-400 mb-3">Key Infrastructure Icons</h4>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <FileText className="w-4 h-4 text-emerald-400" />
                </span>
                <div>
                  <span className="text-slate-300">llms.txt</span>
                  <span className="text-slate-500 text-xs block">AI agent discovery file</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Code className="w-4 h-4 text-emerald-400" />
                </span>
                <div>
                  <span className="text-slate-300">OpenAPI</span>
                  <span className="text-slate-500 text-xs block">API specification</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Map className="w-4 h-4 text-emerald-400" />
                </span>
                <div>
                  <span className="text-slate-300">Sitemap</span>
                  <span className="text-slate-500 text-xs block">XML sitemap</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Globe className="w-4 h-4 text-emerald-400" />
                </span>
                <div>
                  <span className="text-slate-300">Robots.txt</span>
                  <span className="text-slate-500 text-xs block">Crawler directives</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              <span className="text-emerald-400">Green</span> = present, <span className="text-slate-600">Gray</span> = missing
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {leaderboardData.map((site, index) => (
            <motion.div
              key={site.site}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Left: Rank & Site Info */}
                <div className="flex items-center gap-4 lg:w-72 shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center">
                    {site.rank <= 3 ? (
                      rankIcons[site.rank - 1]
                    ) : (
                      <span className="text-slate-500 font-mono text-lg">#{site.rank}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{site.site}</div>
                    <div className="text-sm text-slate-500">{site.url}</div>
                    <div className="text-xs text-slate-600 mt-1">
                      Audited: {new Date(site.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>

                {/* Middle: Grade & Total Score */}
                <div className="flex items-center gap-6 lg:w-48 shrink-0">
                  <div className="text-center">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold border ${gradeColors[site.grade]}`}>
                      {site.grade}
                    </span>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${
                      site.score >= 70 ? 'text-cyan-400' :
                      site.score >= 60 ? 'text-amber-400' :
                      site.score >= 50 ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {site.score}
                    </div>
                    <div className="text-xs text-slate-500">Total Score</div>
                  </div>
                </div>

                {/* Right: Five Pillars */}
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {/* Machine-Readability */}
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Machine</div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                      <div 
                        className="h-full bg-cyan-400 rounded-full transition-all"
                        style={{ width: `${(site.machineReadability / 20) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-cyan-400">{site.machineReadability}</div>
                  </div>
                  
                  {/* Semantic Depth */}
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Semantic</div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                      <div 
                        className="h-full bg-violet-400 rounded-full transition-all"
                        style={{ width: `${(site.semanticDepth / 25) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-violet-400">{site.semanticDepth}</div>
                  </div>
                  
                  {/* Agent Discovery */}
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Discovery</div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                      <div 
                        className="h-full bg-emerald-400 rounded-full transition-all"
                        style={{ width: `${(site.agentDiscovery / 20) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-emerald-400">{site.agentDiscovery}</div>
                  </div>
                  
                  {/* Programmatic Access */}
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Programmatic</div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                      <div 
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${(site.programmaticAccess / 20) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-amber-400">{site.programmaticAccess}</div>
                  </div>
                  
                  {/* Context Efficiency */}
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Efficiency</div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                      <div 
                        className="h-full bg-rose-400 rounded-full transition-all"
                        style={{ width: `${(site.contextEfficiency / 15) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-rose-400">{site.contextEfficiency}</div>
                  </div>
                </div>

                {/* Far Right: Key Features */}
                <div className="flex items-center gap-2 lg:w-44 shrink-0 justify-end">
                  {/* llms.txt */}
                  <span 
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${
                      site.hasLLMsTxt 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-slate-800/50 border-slate-700/30'
                    }`}
                    title={site.hasLLMsTxt ? "Has llms.txt" : "Missing llms.txt"}
                  >
                    <FileText className={`w-4 h-4 ${site.hasLLMsTxt ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </span>
                  {/* OpenAPI */}
                  <span 
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${
                      site.hasOpenAPI 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-slate-800/50 border-slate-700/30'
                    }`}
                    title={site.hasOpenAPI ? "Has OpenAPI" : "Missing OpenAPI"}
                  >
                    <Code className={`w-4 h-4 ${site.hasOpenAPI ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </span>
                  {/* Sitemap */}
                  <span 
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${
                      site.hasSitemap 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-slate-800/50 border-slate-700/30'
                    }`}
                    title={site.hasSitemap ? "Has Sitemap" : "Missing Sitemap"}
                  >
                    <Map className={`w-4 h-4 ${site.hasSitemap ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </span>
                  {/* Robots.txt */}
                  <span 
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${
                      site.hasRobots 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-slate-800/50 border-slate-700/30'
                    }`}
                    title={site.hasRobots ? "Has Robots.txt" : "Missing Robots.txt"}
                  >
                    <Globe className={`w-4 h-4 ${site.hasRobots ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </span>
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
