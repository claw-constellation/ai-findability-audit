'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scan, 
  Zap, 
  Globe, 
  ChevronRight, 
  Activity,
  Cpu,
  Sparkles,
  ArrowRight,
  Target,
  BarChart3,
  Search,
  Shield,
  Trophy
} from 'lucide-react';

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);
  
  return <span>{count}</span>;
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
      
      // Draw connections
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
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
      {children}
    </div>
  );
}

// Glowing button component
function GlowButton({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary'
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}) {
  const baseClasses = `
    relative px-8 py-4 rounded-xl font-semibold text-lg
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden group
  `;
  
  const variantClasses = variant === 'primary'
    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]'
    : 'bg-slate-800/50 text-cyan-400 border border-cyan-500/30 hover:bg-slate-800 hover:border-cyan-500/60';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

// Stat card component
function StatCard({ 
  value, 
  label, 
  icon: Icon,
  suffix = '%',
  delay = 0 
}: { 
  value: number; 
  label: string; 
  icon: React.ElementType;
  suffix?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <GlassCard className="p-6 hover:border-cyan-500/30 transition-colors duration-300">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-4xl font-bold text-white mb-1">
              <AnimatedCounter value={value} />
              {suffix}
            </div>
            <div className="text-slate-400 text-sm">{label}</div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// Feature card component
function FeatureCard({ 
  number, 
  title, 
  description,
  delay = 0 
}: { 
  number: string;
  title: string; 
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <GlassCard className="p-6 h-full group hover:border-cyan-500/30 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-slate-950 font-bold text-lg">
            {number}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// Main page component
export default function Home() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // URL autocomplete helper
  const normalizeUrl = (input: string): string => {
    let normalized = input.trim();
    
    // If no protocol, add https://
    if (!normalized.match(/^https?:\/\//i)) {
      normalized = `https://${normalized}`;
    }
    
    return normalized;
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !email) return;
    
    const normalizedUrl = normalizeUrl(url);
    setError('');
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalizedUrl, email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze website');
      }
      
      // Redirect to results page
      window.location.href = `/audit/${data.auditId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="relative min-h-screen text-slate-200 overflow-x-hidden">
      <ParticleBackground />
      
      {/* Hidden Semantic Structure for AI Extraction */}
      <div className="sr-only">
        <h1>AI Findability Audit</h1>
        <h2>Machine-Readability Analysis</h2>
        <h2>Semantic Depth Scoring</h2>
        <h2>Agent Discovery Verification</h2>
        <h2>Programmatic Access Assessment</h2>
        <h2>Context Efficiency Optimization</h2>
        <h3>How It Works</h3>
        <p>Scan your website to analyze AI accessibility using the A3 Framework.</p>
        <h3>Get Your Score</h3>
        <p>Receive a detailed breakdown across five pillars of AI-readiness.</p>
        <h3>Optimize for AI</h3>
        <p>Implement recommendations to improve visibility in AI answer engines.</p>
      </div>

      {/* Content */}
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
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="/methodology" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Methodology
              </a>
              <a href="/leaderboard" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                Leaderboard
              </a>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">AI Findability Audit</span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">SYSTEM ONLINE</span>
              </div>
            </div>
          </GlassCard>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">Next-Gen SEO Intelligence</span>
              </motion.div>
              
              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  AI Findability
                </span>
                <br />
                <span className="text-slate-500">Audit System</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                69% of searches end without a click. Discover if your business is 
                visible to AI answer engines like Perplexity, ChatGPT, and Google AI Overviews.
              </p>
              
              {/* CTA */}
              <GlowButton onClick={() => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Analysis
                <ArrowRight className="w-5 h-5" />
              </GlowButton>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <StatCard value={69} label="Zero-click searches" icon={Search} delay={0.3} />
              <StatCard value={60} label="AI Overview coverage" icon={Globe} delay={0.4} />
              <StatCard value={82} label="Billion AI market by 2030" icon={BarChart3} suffix="B" delay={0.5} />
            </div>

            {/* Audit Form */}
            <motion.div
              id="audit-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <GlassCard glow className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Initiate Scan</h2>
                    <p className="text-slate-400 text-sm">Enter target parameters for analysis</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Target URL
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="netflix.com or https://netflix.com"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                        required
                      />
                    </div>
                    {url && !url.match(/^https?:\/\//i) && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-cyan-400 flex items-center gap-2"
                      >
                        <Sparkles className="w-3 h-3" />
                        Will scan: {normalizeUrl(url)}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Contact Channel
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                  
                  <GlowButton disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Activity className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Cpu className="w-5 h-5" />
                        Execute Audit
                      </>
                    )}
                  </GlowButton>
                </form>
                
                <p className="mt-4 text-center text-slate-500 text-sm">
                  Free analysis includes: AI-readability score, dimension breakdown, and prioritized action plan
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Analysis Protocol</h2>
              <p className="text-slate-400">Three-phase intelligence gathering system</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                number="01"
                title="Scan"
                description="Deep crawl using AI-native tools. We analyze exactly how Perplexity, ChatGPT, and Google AI see your site."
                delay={0.1}
              />
              <FeatureCard
                number="02"
                title="Score"
                description="Four-dimensional assessment: token efficiency, semantic structure, content clarity, and schema markup presence."
                delay={0.2}
              />
              <FeatureCard
                number="03"
                title="Optimize"
                description="Receive a prioritized battle plan. Fix high-impact issues first for maximum AI visibility gains."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <Scan className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-semibold text-slate-300">AI Findability Audit</span>
            </div>
            <p className="text-slate-500 text-sm">
              Built for the AI-first web. Making businesses discoverable to the next generation of search.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
