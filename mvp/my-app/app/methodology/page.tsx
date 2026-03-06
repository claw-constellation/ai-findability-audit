'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ChevronRight,
  ArrowLeft,
  Target,
  FileText,
  Code,
  Globe,
  Layers,
  Zap,
  CheckCircle2,
  XCircle,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    id: 'machine-readability',
    name: 'Machine-Readability',
    score: '0-20 points',
    icon: FileText,
    color: 'cyan',
    question: 'Can an AI agent actually read your content?',
    explanation: 'AI agents don\'t use browsers like humans. They fetch raw HTML and extract text. If your site is bloated with JavaScript, tracking pixels, and unnecessary markup, the actual content gets buried. This pillar measures the signal-to-noise ratio.',
    goodExample: 'A blog post with clean HTML: 80% text, 20% markup.',
    badExample: 'A marketing site with 500KB of JavaScript to display 500 words.',
    howWeMeasure: [
      'Text-to-HTML ratio analysis',
      'JavaScript dependency detection',
      'Server-side rendering check'
    ]
  },
  {
    id: 'semantic-depth',
    name: 'Semantic Depth',
    score: '0-25 points',
    icon: Layers,
    color: 'violet',
    question: 'Does your content have meaningful structure?',
    explanation: 'AI agents use headings, lists, and semantic HTML to understand information hierarchy. A wall of divs tells an agent nothing. Proper structure helps agents chunk content for retrieval and understand relationships between ideas.',
    goodExample: 'H1 for title, H2 for sections, H3 for subsections, lists for steps.',
    badExample: 'Everything is a <div> with CSS classes like "heading-large".',
    howWeMeasure: [
      'Heading hierarchy validation (H1 → H2 → H3)',
      'Schema.org / JSON-LD structured data detection',
      'Semantic HTML element usage (article, section, nav)',
      'List and table structure analysis'
    ]
  },
  {
    id: 'agent-discovery',
    name: 'Agent Discovery',
    score: '0-20 points',
    icon: Globe,
    color: 'emerald',
    question: 'Can AI agents find and access your content?',
    explanation: 'AI agents need a map. Without explicit signals like llms.txt, they\'re guessing what\'s important. This pillar checks if you\'ve created the modern equivalent of a sitemap specifically designed for AI consumption.',
    goodExample: '/llms.txt file linking to key docs, robots.txt allowing AI crawlers.',
    badExample: 'No llms.txt, robots.txt blocking all crawlers, no sitemap.',
    howWeMeasure: [
      'llms.txt existence and accessibility',
      'robots.txt AI crawler directives (ChatGPT-User, Claude-Web, PerplexityBot)',
      'XML sitemap presence',
      'API documentation discoverability'
    ]
  },
  {
    id: 'programmatic-access',
    name: 'Programmatic Access',
    score: '0-20 points',
    icon: Code,
    color: 'amber',
    question: 'Can AI agents interact with your services?',
    explanation: 'Reading is passive. True agent-friendliness means enabling action. If an AI agent can\'t understand your API, it can\'t help users integrate with you. OpenAPI specs are the contract between your service and AI agents.',
    goodExample: 'OpenAPI spec at /openapi.json with examples and auth docs.',
    badExample: 'API docs are PDFs or require clicking through web UI.',
    howWeMeasure: [
      'OpenAPI/Swagger specification availability',
      'API documentation quality',
      'Code examples in multiple languages',
      'Authentication documentation clarity',
      'MCP (Model Context Protocol) server presence'
    ]
  },
  {
    id: 'context-efficiency',
    name: 'Context Efficiency',
    score: '0-15 points',
    icon: Zap,
    color: 'rose',
    question: 'How efficiently does your content use AI context windows?',
    explanation: 'AI agents have limited context (typically 4K-128K tokens). If your content is bloated with marketing fluff, the agent wastes tokens on noise instead of signal. Concise, information-dense content performs better.',
    goodExample: 'TL;DR at top, short paragraphs, bullet points, no buzzwords.',
    badExample: '3 paragraphs of "revolutionary AI-powered platform" before getting to the point.',
    howWeMeasure: [
      'Information density scoring',
      'Marketing fluff word detection',
      'Summary/TL;DR presence',
      'Paragraph length optimization',
      'Quick-start guide availability'
    ]
  }
];

const gradeScale = [
  { grade: 'A+', range: '90-100', label: 'Agent-Native', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', description: 'Optimized for AI-first web. Agents can discover, read, and interact with your content effortlessly.' },
  { grade: 'A', range: '80-89', label: 'Agent-Optimized', color: 'text-emerald-300', bg: 'bg-emerald-300/10', border: 'border-emerald-300/20', description: 'Excellent AI accessibility with minor improvements possible.' },
  { grade: 'B', range: '70-79', label: 'Agent-Ready', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20', description: 'Good foundation but needs work to compete in AI-powered search.' },
  { grade: 'C', range: '60-69', label: 'Agent-Compatible', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', description: 'Accessible to agents but significant gaps in discoverability.' },
  { grade: 'D', range: '50-59', label: 'Agent-Challenged', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', description: 'Poor AI accessibility. Likely being overlooked by answer engines.' },
  { grade: 'F', range: '0-49', label: 'Agent-Opaque', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', description: 'Effectively invisible to AI agents. Immediate action required.' },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                AI Findability
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/leaderboard" 
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Leaderboard
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              <span>The A3 Framework</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How We Score
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {" "}Agent Accessibility
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The A3 Framework: AI-Agent Accessibility. A practical guide to understanding 
              how AI agents interact with your website — and how to measure it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* First Principles Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 shrink-0">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">First Principles</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                AI agents are not humans. They don&apos;t scroll, click, or &quot;browse.&quot; They fetch content 
                programmatically and process it through language models. This fundamental difference 
                means traditional SEO (optimizing for human attention) is only half the battle.
              </p>
              <p className="text-slate-400 leading-relaxed">
                <strong className="text-slate-200">Agent Findability</strong> is about optimizing for 
                machine consumption: clean structure, explicit signals, and programmatic accessibility. 
                The A3 Framework measures five critical dimensions of this optimization.
              </p>
            </div>
          </div>
        </motion.div>

        {/* The Five Pillars */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Target className="w-6 h-6 text-cyan-400" />
            The Five Pillars
          </h2>
          
          <div className="space-y-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-${pillar.color}-500/10 border border-${pillar.color}-500/20 shrink-0`}>
                      <pillar.icon className={`w-6 h-6 text-${pillar.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{pillar.name}</h3>
                        <span className="text-sm text-slate-500">{pillar.score}</span>
                      </div>
                      <p className="text-cyan-400 text-sm font-medium mb-3">{pillar.question}</p>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{pillar.explanation}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-medium text-emerald-400">Good Example</span>
                          </div>
                          <p className="text-sm text-slate-400">{pillar.goodExample}</p>
                        </div>
                        <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span className="text-sm font-medium text-red-400">Bad Example</span>
                          </div>
                          <p className="text-sm text-slate-400">{pillar.badExample}</p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-slate-500 font-medium">How we measure:</span>
                        <ul className="mt-2 space-y-1">
                          {pillar.howWeMeasure.map((item, i) => (
                            <li key={i} className="text-slate-400 flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grading Scale */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Target className="w-6 h-6 text-cyan-400" />
            Grading Scale
          </h2>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            {gradeScale.map((grade, index) => (
              <motion.div
                key={grade.grade}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800/50 last:border-0 items-center hover:bg-slate-800/30 transition-colors"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-lg ${grade.bg} ${grade.color} border ${grade.border}`}>
                    {grade.grade}
                  </span>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <div className="text-sm text-slate-500">{grade.range}</div>
                  <div className={`font-medium ${grade.color}`}>{grade.label}</div>
                </div>
                <div className="col-span-7 md:col-span-9">
                  <p className="text-sm text-slate-400">{grade.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why This Matters */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-white mb-4">Why This Matters</h2>
          <div className="space-y-4 text-slate-400">
            <p>
              <strong className="text-slate-200">69% of Google searches</strong> now end without a click. 
              Users get their answers directly from AI Overviews, ChatGPT, Perplexity, and Claude. 
              If your content isn&apos;t agent-accessible, it&apos;s invisible to the fastest-growing segment 
              of information discovery.
            </p>
            <p>
              <strong className="text-slate-200">The shift is structural.</strong> Just as mobile-first 
              design replaced desktop-first in the 2010s, agent-first design is becoming essential in 
              the 2020s. The A3 Framework helps you measure and improve your readiness for this shift.
            </p>
            <p>
              <strong className="text-slate-200">This is not theoretical.</strong> Our leaderboard shows 
              that even major AI companies (OpenAI: F, Anthropic: D) have agent-opaque websites. 
              The gap between awareness and implementation is your opportunity.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-slate-800/50 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to test your site?
            </h2>
            <p className="text-slate-400 mb-6">
              Get your A3 Framework score and see where you stand.
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
