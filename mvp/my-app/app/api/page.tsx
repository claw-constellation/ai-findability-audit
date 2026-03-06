import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Code, 
  ArrowLeft, 
  FileJson, 
  Globe, 
  Scan,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Documentation - AI Findability Audit',
  description: 'REST API for analyzing website AI-readability using the A3 Framework.',
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200">
      {/* Hidden Semantic Structure for AI Extraction */}
      <div className="sr-only">
        <h1>AI Findability Audit API Documentation</h1>
        <h2>REST API Endpoints</h2>
        <h3>POST Audit Endpoint</h3>
        <p>Submit a website URL for AI accessibility analysis.</p>
        <h3>GET Audit Results Endpoint</h3>
        <p>Retrieve audit results by ID or get live leaderboard data.</p>
        <h2>A3 Framework Scoring</h2>
        <p>API returns scores across five pillars: Machine-Readability, Semantic Depth, Agent Discovery, Programmatic Access, and Context Efficiency.</p>
        <h2>Authentication</h2>
        <p>No API key required. Rate limits apply.</p>
        <h2>OpenAPI Specification</h2>
        <p>Download the complete OpenAPI 3.0 spec at /openapi.json</p>
      </div>

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
            <Link 
              href="/" 
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Audit
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Code className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">API Documentation</h1>
          </div>
          <p className="text-slate-400 text-lg">
            REST API for analyzing website AI-readability using the A3 Framework.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Start</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 mb-4">
              Submit a website URL for analysis and retrieve results using the audit ID.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Globe className="w-4 h-4" />
              <span>Base URL: </span>
              <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">
                https://ai-findability-audit.vercel.app/api
              </code>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Endpoints</h2>
          
          {/* POST /audit */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 border-b border-slate-800">
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-sm font-medium">POST</span>
              <code className="text-cyan-400">/audit</code>
              <span className="text-slate-500 text-sm">Submit website for analysis</span>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Request Body</h3>
              <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-slate-300">{
`{
  "url": "https://example.com",
  "email": "user@example.com"
}`
                }</code>
              </pre>
              
              <h3 className="text-sm font-medium text-slate-400 mb-3 mt-6">Response</h3>
              <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-slate-300">{
`{
  "auditId": "abc-123",
  "status": "completed"
}`
                }</code>
              </pre>
            </div>
          </div>

          {/* GET /audit */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 border-b border-slate-800">
              <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-sm font-medium">GET</span>
              <code className="text-cyan-400">/audit?id=&#123;id&#125;</code>
              <span className="text-slate-500 text-sm">Retrieve audit results</span>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Query Parameters</h3>
              <ul className="space-y-2 text-sm text-slate-400 mb-6">
                <li className="flex items-start gap-2">
                  <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-400">id</code>
                  <span>Audit ID returned from POST request</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-400">leaderboard=true</code>
                  <span>Get live leaderboard instead of single audit</span>
                </li>
              </ul>
              
              <h3 className="text-sm font-medium text-slate-400 mb-3">Response</h3>
              <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-slate-300">{
`{
  "scores": {
    "overall": 79,
    "machineReadability": 18,
    "semanticDepth": 12,
    "agentDiscovery": 20,
    "programmaticAccess": 20,
    "contextEfficiency": 9
  },
  "grade": "B",
  "category": "Agent-Ready",
  "recommendations": [...]
}`
                }</code>
              </pre>
            </div>
          </div>
        </section>

        {/* A3 Framework */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">A3 Framework Scores</h2>
          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <div className="flex-1">
                <div className="font-medium text-white">Machine-Readability</div>
                <div className="text-sm text-slate-500">Clean HTML, low JS bloat (0-20 points)</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-violet-400" />
              <div className="flex-1">
                <div className="font-medium text-white">Semantic Depth</div>
                <div className="text-sm text-slate-500">Heading hierarchy, structured data (0-25 points)</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="flex-1">
                <div className="font-medium text-white">Agent Discovery</div>
                <div className="text-sm text-slate-500">llms.txt, robots.txt, sitemaps (0-20 points)</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="flex-1">
                <div className="font-medium text-white">Programmatic Access</div>
                <div className="text-sm text-slate-500">OpenAPI, API docs, code examples (0-20 points)</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="flex-1">
                <div className="font-medium text-white">Context Efficiency</div>
                <div className="text-sm text-slate-500">Conciseness, TL;DRs, low fluff (0-15 points)</div>
              </div>
            </div>
          </div>
        </section>

        {/* OpenAPI Spec */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">OpenAPI Specification</h2>
          <a 
            href="/openapi.json" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition-colors"
          >
            <FileJson className="w-4 h-4" />
            Download openapi.json
          </a>
        </section>
      </main>
    </div>
  );
}
