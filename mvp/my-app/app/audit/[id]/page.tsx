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
  Sparkles
} from 'lucide-react';

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
    if (value >= 75) return '#10b981'; // emerald
    if (value >= 50) return '#f59e0b'; // amber
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
function ScoreBar({ label, value, description }: { label: string; value: number; description: string }) {
  const getColor = () => {
    if (value >= 75) return 'from-emerald-500 to-emerald-400';
    if (value >= 50) return 'from-amber-500 to-amber-400';
    return 'from-red-500 to-red-400';
  };
  
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold">{label}</h3>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
        <span className={`text-2xl font-bold ${value >= 75 ? 'text-emerald-400' : value >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
          {value}/100
        </span>
      </div>
      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
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
          <p className="mt-6 text-cyan-400 font-medium">Initializing scan sequence...</p>
          <p className="mt-2 text-slate-500 text-sm">Analyzing target parameters</p>
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
                <span className="text-emerald-400 text-sm font-medium">ANALYSIS COMPLETE</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Audit Results
              </h1>
              <p className="text-slate-400 text-lg">{audit.url}</p>
            </motion.div>

            {/* Overall Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <GlassCard glow className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <CircularProgress value={audit.analysis.scores.overall} size={140} />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-3">
                      Overall AI-Readability Score
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

            {/* Score Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Dimension Analysis</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ScoreBar 
                  label="Token Efficiency"
                  value={audit.analysis.scores.tokenEfficiency}
                  description="HTML-to-content ratio"
                />
                <ScoreBar 
                  label="Semantic Structure"
                  value={audit.analysis.scores.semanticStructure}
                  description="Heading hierarchy & organization"
                />
                <ScoreBar 
                  label="Content Clarity"
                  value={audit.analysis.scores.contentClarity}
                  description="Readability & key information"
                />
                <ScoreBar 
                  label="Schema Markup"
                  value={audit.analysis.scores.schemaMarkup}
                  description="Structured data presence"
                />
              </div>
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
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex items-center gap-3 md:flex-col md:items-start md:w-32 flex-shrink-0">
                          <PriorityBadge priority={rec.priority} />
                          <span className="text-slate-500 text-sm">{rec.category}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{rec.title}</h3>
                          <p className="text-slate-400 mb-3">{rec.description}</p>
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
                  Want us to fix these issues?
                </h2>
                <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                  Our team can implement all recommendations and make your site fully AI-ready. 
                  Get a detailed implementation plan.
                </p>
                <button className="px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all">
                  Get Implementation Quote
                </button>
              </GlassCard>
            </motion.div>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-slate-500">
              <p>Audit generated on {new Date(audit.createdAt).toLocaleDateString()}</p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
