'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Scan, 
  ArrowLeft, 
  Activity,
  AlertCircle,
  CheckCircle,
  Zap,
  Target,
  Globe,
  Cpu,
  Sparkles,
  FileCode,
  Database,
  Search,
  Layers,
  Layout,
  Award
} from 'lucide-react';

interface AuditData {
  id: string;
  url: string;
  email: string;
  createdAt: string;
  status: string;
  framework: string;
  version: string;
  analysis: {
    scores: {
      overall: number;
      machineReadability: number;
      semanticDepth: number;
      agentDiscovery: number;
      programmaticAccess: number;
      contextEfficiency: number;
    };
    grade: string;
    category: string;
    recommendations: Array<{
      priority: string;
      category: string;
      title: string;
      description: string;
      impact: string;
      action?: string;
    }>;
    summary: string;
    pageCount: number;
    wordCount: number;
  };
}

// Particle background component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      });
      
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f172a 50%, #1e1b4b 100%)' }}
    />
  );
}

// Glass card component
function GlassCard({ children, className = '', glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-slate-900/40 backdrop-blur-xl
        border border-slate-700/50
        ${glow ? 'shadow-[0_0_40px_rgba(0,212,255,0.15)]' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
      {children}
    </div>
  );
}

// Circular progress component
function CircularProgress({ value, size = 120, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  const getColor = () => {
    if (value >= 80) return '#10b981'; // emerald
    if (value >= 60) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 6px ${getColor()})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
    </div>
  );
}

// Score bar component
function ScoreBar({ 
  label, 
  value, 
  description, 
  icon: Icon,
  max = 100 
}: { 
  label: string; 
  value: number; 
  description: string;
  icon: React.ElementType;
  max?: number;
}) {
  const percentage = (value / max) * 100;
  const getColor = () => {
    if (percentage >= 80) return 'from-emerald-500 to-emerald-400';
    if (percentage >= 60) return 'from-amber-500 to-amber-400';
    return 'from-red-500 to-red-400';
  };
  
  return (
    <GlassCard className="p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold">{label}</h3>
              <p className="text-slate-400 text-sm">{description}</p>
            </div>
            <span className={`text-2xl font-bold ${percentage >= 80 ? 'text-emerald-400' : percentage >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
              {value}/{max}
            </span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// Priority badge component
function PriorityBadge({ priority }: { priority: string }) {
  const colors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    low: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[priority as keyof typeof colors]}`}>
      {priority.toUpperCase()}
    </span>
  );
}

// Grade badge component
function GradeBadge({ grade, category }: { grade: string; category: string }) {
  const getColors = () => {
    if (grade === 'A+') return 'from-emerald-500 to-emerald-400 text-emerald-400';
    if (grade === 'A') return 'from-emerald-400 to-cyan-400 text-emerald-400';
    if (grade === 'B') return 'from-cyan-400 to-blue-400 text-cyan-400';
    if (grade === 'C') return 'from-amber-400 to-orange-400 text-amber-400';
    if (grade === 'D') return 'from-orange-400 to-red-400 text-orange-400';
    return 'from-red-500 to-red-400 text-red-400';
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className={`text-6xl font-bold bg-gradient-to-r ${getColors()} bg-clip-text text-transparent`}>
        {grade}
      </div>
      <div className="text-slate-400 text-sm mt-1">{category}</div>
    </div>
  );
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
      <div className="relative min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin mx-auto" style={{ animationDuration: '1.5s' }} />
          </div>
          <p className="mt-6 text-cyan-400 font-medium">Running A3 Framework analysis...</p>
          <p className="mt-2 text-slate-500 text-sm">Evaluating AI-Agent Accessibility</p>
        </div>
      </div>
    );
  }

  if (error || !audit) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-red-400 font-medium">{error || "Audit not found"}</p>
          <Link 
            href="/" 
            className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Start new audit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen text-slate-200 overflow-x-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <GlassCard className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <Scan className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-bold text-xl text-white">AIFA</span>
            </div>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Scanner</span>
            </Link>
          </GlassCard>
        </nav>

        {/* Content */}
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">A3 ANALYSIS COMPLETE</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                AI-Agent Accessibility Report
              </h1>
              <p className="text-slate-400 text-lg">{audit.url}</p>
              <p className="text-slate-500 text-sm mt-2">
                Framework: {audit.framework} v{audit.version}
              </p>
            </motion.div>

            {/* Overall Score & Grade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <GlassCard glow className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <CircularProgress value={audit.analysis.scores.overall} size={160} strokeWidth={10} />
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                      <GradeBadge 
                        grade={audit.analysis.grade} 
                        category={audit.analysis.category} 
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                      Overall A3 Score
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-4">
                      {audit.analysis.summary}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {audit.analysis.pageCount} page analyzed
                      </span>
                      <span className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        {audit.analysis.wordCount.toLocaleString()} words
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* A3 Five Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Layers className="w-6 h-6 text-cyan-400" />
                Five Pillars of AI-Readiness
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ScoreBar 
                  label="Machine-Readability"
                  value={audit.analysis.scores.machineReadability}
                  max={20}
                  description="Clean HTML vs. JS-bloat"
                  icon={FileCode}
                />
                <ScoreBar 
                  label="Semantic Depth"
                  value={audit.analysis.scores.semanticDepth}
                  max={25}
                  description="Structured data & heading hierarchies"
                  icon={Database}
                />
                <ScoreBar 
                  label="Agent Discovery"
                  value={audit.analysis.scores.agentDiscovery}
                  max={20}
                  description="llms.txt & bot permissions"
                  icon={Search}
                />
                <ScoreBar 
                  label="Programmatic Access"
                  value={audit.analysis.scores.programmaticAccess}
                  max={20}
                  description="API docs & endpoint clarity"
                  icon={Layout}
                />
                <ScoreBar 
                  label="Context Efficiency"
                  value={audit.analysis.scores.contextEfficiency}
                  max={15}
                  description="Conciseness & token-optimization"
                  icon={Zap}
                />
              </div>
            </motion.div>

            {/* A3 Framework Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-12"
            >
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  Understanding Your A3 Grade
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="font-semibold text-emerald-400 mb-1">A+ / A (90-100)</div>
                    <div className="text-slate-400">Agent-Native / Agent-Optimized</div>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <div className="font-semibold text-cyan-400 mb-1">B / C (60-89)</div>
                    <div className="text-slate-400">Agent-Ready / Agent-Compatible</div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="font-semibold text-red-400 mb-1">D / F (0-59)</div>
                    <div className="text-slate-400">Agent-Challenged / Agent-Opaque</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Prioritized Recommendations</h2>
              <div className="space-y-4">
                {audit.analysis.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <GlassCard className="p-6 hover:border-cyan-500/30 transition-colors">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <PriorityBadge priority={rec.priority} />
                            <span className="text-cyan-400 text-sm font-medium">{rec.category}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{rec.title}</h3>
                          <p className="text-slate-400 mb-3">{rec.description}</p>
                          {rec.action && (
                            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 mb-3">
                              <span className="text-slate-500 text-xs uppercase tracking-wider">Action:</span>
                              <p className="text-slate-300 text-sm mt-1">{rec.action}</p>
                            </div>
                          )}
                          <p className="text-cyan-400 text-sm flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Impact: {rec.impact}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard glow className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Want to achieve Agent-Native status?
                </h2>
                <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                  Our team can implement all A3 Framework recommendations and make your site 
                  fully optimized for AI agents. Get a detailed implementation roadmap.
                </p>
                <button className="px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all">
                  Get A3 Implementation Plan
                </button>
              </GlassCard>
            </motion.div>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-slate-500">
              <p>Audit generated on {new Date(audit.createdAt).toLocaleDateString()}</p>
              <p className="mt-1">Using A3 (AI-Agent Accessibility) Framework v1.0</p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
