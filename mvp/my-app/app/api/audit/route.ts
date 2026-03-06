import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime (not Edge)
export const runtime = "nodejs";

// In-memory storage for audits (replace with database in production)
const audits = new Map();

// Leaderboard storage - stores public audit results
interface LeaderboardEntry {
  id: string;
  site: string;
  url: string;
  score: number;
  grade: string;
  category: string;
  hasLLMsTxt: boolean;
  hasOpenAPI: boolean;
  hasSitemap: boolean;
  hasRobots: boolean;
  createdAt: string;
}

const leaderboard = new Map<string, LeaderboardEntry>();

// A3 Framework: AI-Agent Accessibility Scorecard
// Verification-based scoring (not heuristics)

export async function POST(request: NextRequest) {
  try {
    const { url, email } = await request.json();

    if (!url || !email) {
      return NextResponse.json(
        { error: "URL and email are required" },
        { status: 400 }
      );
    }

    // Validate URL
    let validatedUrl: URL;
    try {
      validatedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Generate audit ID
    const auditId = crypto.randomUUID();

    // Start the A3 Framework analysis with REAL verification
    const analysis = await analyzeWebsiteA3(validatedUrl.toString());

    // Store audit
    const audit = {
      id: auditId,
      url: validatedUrl.toString(),
      email,
      createdAt: new Date().toISOString(),
      status: "completed",
      analysis,
    };

    audits.set(auditId, audit);

    // Add to leaderboard (public data only)
    const domain = validatedUrl.hostname.replace(/^www\./, '');
    const leaderboardEntry: LeaderboardEntry = {
      id: auditId,
      site: domain,
      url: validatedUrl.toString(),
      score: analysis.scores.overall,
      grade: analysis.grade,
      category: analysis.category,
      hasLLMsTxt: analysis.verifiedFiles.llmsTxt.exists,
      hasOpenAPI: analysis.verifiedFiles.openapiJson.exists || analysis.verifiedFiles.openapiYaml.exists,
      hasSitemap: analysis.verifiedFiles.sitemapXml.exists || analysis.verifiedFiles.sitemapIndex.exists,
      hasRobots: analysis.verifiedFiles.robotsTxt.exists,
      createdAt: new Date().toISOString(),
    };

    // Only add if not already exists (by domain), or update if new score
    const existingEntry = Array.from(leaderboard.values()).find(e => e.site === domain);
    if (!existingEntry) {
      leaderboard.set(auditId, leaderboardEntry);
    }

    return NextResponse.json({ auditId, status: "completed" });
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: "Failed to analyze website" },
      { status: 500 }
    );
  }
}

async function analyzeWebsiteA3(url: string) {
  try {
    const baseUrl = new URL(url);
    
    // Fetch website content AND verify real agent files
    const [fetchResult, agentFiles] = await Promise.all([
      fetchWebsiteContent(url),
      verifyAgentFiles(baseUrl),
    ]);
    
    if (!fetchResult) {
      throw new Error("Unable to fetch website content");
    }

    // A3 Framework Analysis with VERIFIED data
    const a3Scores = calculateA3Scores(fetchResult, agentFiles, url);
    
    // Generate A3-based recommendations
    const recommendations = generateA3Recommendations(a3Scores, fetchResult, agentFiles);
    
    // Determine grade and category
    const { grade, category } = getA3Grade(a3Scores.overall);

    return {
      scores: a3Scores,
      grade,
      category,
      recommendations,
      summary: generateA3Summary(a3Scores, url, category),
      pageCount: 1,
      wordCount: fetchResult.text?.split(/\s+/).length || 0,
      urlAnalyzed: url,
      framework: "A3 (AI-Agent Accessibility)",
      version: "2.0",
      verifiedFiles: agentFiles, // Include what we actually found
    };
  } catch (error) {
    console.error("A3 Analysis error:", error);
    throw error;
  }
}

// NEW: Actually verify agent files exist
async function verifyAgentFiles(baseUrl: URL): Promise<AgentFiles> {
  const files: AgentFiles = {
    llmsTxt: { exists: false, url: `${baseUrl.origin}/llms.txt` },
    llmsFullTxt: { exists: false, url: `${baseUrl.origin}/llms-full.txt` },
    robotsTxt: { exists: false, url: `${baseUrl.origin}/robots.txt` },
    sitemapXml: { exists: false, url: `${baseUrl.origin}/sitemap.xml` },
    sitemapIndex: { exists: false, url: `${baseUrl.origin}/sitemap_index.xml` },
    openapiJson: { exists: false, url: `${baseUrl.origin}/openapi.json` },
    openapiYaml: { exists: false, url: `${baseUrl.origin}/openapi.yaml` },
    apiDocs: { exists: false, url: null },
    mcpServer: { exists: false, url: null },
  };

  // Check all files in parallel with timeouts
  const checks = [
    checkFile(files.llmsTxt.url, "llmsTxt", files),
    checkFile(files.llmsFullTxt.url, "llmsFullTxt", files),
    checkFile(files.robotsTxt.url, "robotsTxt", files),
    checkFile(files.sitemapXml.url, "sitemapXml", files),
    checkFile(files.sitemapIndex.url, "sitemapIndex", files),
    checkFile(files.openapiJson.url, "openapiJson", files),
    checkFile(files.openapiYaml.url, "openapiYaml", files),
    // Check common API doc paths
    checkFile(`${baseUrl.origin}/api`, "apiDocs", files, true),
    checkFile(`${baseUrl.origin}/docs`, "apiDocs", files, true),
    checkFile(`${baseUrl.origin}/api/docs`, "apiDocs", files, true),
    checkFile(`${baseUrl.origin}/reference`, "apiDocs", files, true),
    // Check for MCP server
    checkFile(`${baseUrl.origin}/.well-known/mcp.json`, "mcpServer", files),
  ];

  await Promise.all(checks);

  return files;
}

async function checkFile(
  url: string | null, 
  key: keyof AgentFiles, 
  files: AgentFiles,
  isRedirectOk: boolean = false
): Promise<void> {
  if (!url) return;
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: isRedirectOk ? "follow" : "manual",
    });

    clearTimeout(timeout);

    if (response.ok || (isRedirectOk && response.status >= 300 && response.status < 400)) {
      if (key === "apiDocs" && !files.apiDocs.exists) {
        files.apiDocs.exists = true;
        files.apiDocs.url = url;
      } else if (key !== "apiDocs" || !files[key].exists) {
        files[key].exists = true;
      }
    }
  } catch (e) {
    // File doesn't exist or timed out
  }
}

async function fetchWebsiteContent(url: string) {
  // Try multiple methods to fetch content

  // Method 1: Jina AI Reader (free, reliable)
  try {
    const jinaResponse = await fetch(`https://r.jina.ai/http://${url.replace(/^https?:\/\//, "")}`, {
      headers: { "Accept": "application/json" },
    });

    if (jinaResponse.ok) {
      const text = await jinaResponse.text();
      return {
        text,
        markdown: text,
        html: null,
        source: "jina",
      };
    }
  } catch (e) {
    console.log("Jina fetch failed, trying fallback...");
  }

  // Method 2: Direct fetch with text extraction
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; A3-Audit/2.0)",
      },
    });

    if (response.ok) {
      const html = await response.text();
      // Simple HTML to text extraction
      const text = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      return {
        text,
        markdown: text,
        html,
        source: "direct",
      };
    }
  } catch (e) {
    console.log("Direct fetch failed");
  }

  return null;
}

function calculateA3Scores(data: any, agentFiles: AgentFiles, url: string) {
  const text = data.text || "";
  const html = data.html || "";

  // A3 Framework: Five Pillars of AI-Readiness
  // Now using VERIFIED file existence, not heuristics

  // Pillar 1: Machine-Readability (0-20 points)
  const machineReadability = calculateMachineReadability(text, html);

  // Pillar 2: Semantic Depth (0-25 points)
  const semanticDepth = calculateSemanticDepth(text, html);

  // Pillar 3: Agent Discovery (0-20 points) - VERIFIED
  const agentDiscovery = calculateAgentDiscoveryVerified(agentFiles, text);

  // Pillar 4: Programmatic Access (0-20 points) - VERIFIED
  const programmaticAccess = calculateProgrammaticAccessVerified(agentFiles, text);

  // Pillar 5: Context Efficiency (0-15 points)
  const contextEfficiency = calculateContextEfficiency(text);

  // Calculate overall A3 Score (0-100)
  const overall = Math.round(
    machineReadability +
    semanticDepth +
    agentDiscovery +
    programmaticAccess +
    contextEfficiency
  );

  return {
    overall,
    machineReadability,
    semanticDepth,
    agentDiscovery,
    programmaticAccess,
    contextEfficiency,
  };
}

// PILLAR 1: Machine-Readability (0-20 points)
function calculateMachineReadability(text: string, html: string): number {
  if (!html || html.length === 0) {
    // Text-only analysis (Jina reader gives clean text)
    return text.length > 1000 ? 18 : 12;
  }

  const textSize = text.length;
  const htmlSize = html.length;

  if (htmlSize === 0) return 10;

  // Calculate text-to-code ratio
  const ratio = textSize / htmlSize;

  // Score based on ratio
  if (ratio > 0.20) return 20;      // Excellent: >80% text-to-code
  if (ratio > 0.15) return 18;      // Very good: 70-80%
  if (ratio > 0.10) return 15;      // Good: 60-70%
  if (ratio > 0.05) return 10;      // Fair: 40-60%
  if (ratio > 0.02) return 5;       // Poor: 20-40%
  return 2;                          // Very poor: <20%
}

// PILLAR 2: Semantic Depth (0-25 points)
function calculateSemanticDepth(text: string, html: string): number {
  let score = 8; // Base score

  // Check for heading patterns in text (from Jina's markdown output)
  const h1Matches = (text.match(/^#\s+.+$/gm) || []).length;
  const h2Matches = (text.match(/^##\s+.+$/gm) || []).length;
  const h3Matches = (text.match(/^###\s+.+$/gm) || []).length;

  // Heading hierarchy quality (max 8 points)
  if (h1Matches === 1) score += 2;
  if (h1Matches >= 1 && h2Matches >= 2) score += 3;
  if (h2Matches >= 2 && h3Matches >= 3) score += 3;

  // Check for structured content indicators (max 6 points)
  const listItems = (text.match(/^[-*•]\s+/gm) || []).length;
  if (listItems >= 5) score += 2;

  const links = (text.match(/https?:\/\/[^\s]+/g) || []).length;
  if (links >= 3) score += 2;

  const codeBlocks = (text.match(/```[\s\S]*?```/g) || []).length;
  if (codeBlocks >= 1) score += 2;

  // Check for table-like structures (max 2 points)
  const tables = (text.match(/\|[^\n]+\|/g) || []).length;
  if (tables >= 3) score += 2;

  // Check for Schema.org/JSON-LD in raw HTML (max 5 points)
  if (html) {
    if (html.includes('application/ld+json')) score += 3;
    if (html.includes('schema.org')) score += 2;
  }

  // Check for semantic HTML elements in raw HTML (max 4 points)
  if (html) {
    const semanticTags = ['<article', '<section', '<nav', '<main', '<header', '<footer'];
    const hasSemantic = semanticTags.some(tag => html.includes(tag));
    if (hasSemantic) score += 2;

    const ariaLabels = (html.match(/aria-label=/g) || []).length;
    if (ariaLabels >= 3) score += 2;
  }

  return Math.min(25, score);
}

// PILLAR 3: Agent Discovery (0-20 points) - VERIFIED
function calculateAgentDiscoveryVerified(files: AgentFiles, text: string): number {
  let score = 2; // Minimal base score for being accessible

  // llms.txt is the gold standard (8 points)
  if (files.llmsTxt.exists) {
    score += 8;
  }

  // llms-full.txt is bonus (2 points)
  if (files.llmsFullTxt.exists) {
    score += 2;
  }

  // robots.txt matters for crawlers (3 points)
  if (files.robotsTxt.exists) {
    score += 3;
  }

  // Sitemap helps discovery (3 points)
  if (files.sitemapXml.exists || files.sitemapIndex.exists) {
    score += 3;
  }

  // Mention of agent-friendly practices in content (2 points)
  const hasAgentMentions = text.toLowerCase().includes('llm') ||
                           text.toLowerCase().includes('ai agent') ||
                           text.toLowerCase().includes('for agents');
  if (hasAgentMentions) score += 2;

  return Math.min(20, score);
}

// PILLAR 4: Programmatic Access (0-20 points) - VERIFIED
function calculateProgrammaticAccessVerified(files: AgentFiles, text: string): number {
  let score = 3; // Base score

  // OpenAPI spec is the gold standard (8 points)
  if (files.openapiJson.exists || files.openapiYaml.exists) {
    score += 8;
  }

  // API documentation presence (5 points)
  if (files.apiDocs.exists) {
    score += 5;
  }

  // MCP server (future-proofing) (2 points)
  if (files.mcpServer.exists) {
    score += 2;
  }

  // Code examples in content (max 4 points)
  const hasCodeExamples = text.includes('```') ||
                          text.toLowerCase().includes('curl') ||
                          /(javascript|python|java|php|ruby|go|rust|bash)/i.test(text);
  if (hasCodeExamples) score += 2;

  // Authentication documentation (2 points)
  const hasAuth = text.toLowerCase().includes('authentication') ||
                  text.toLowerCase().includes('api key') ||
                  text.toLowerCase().includes('bearer token');
  if (hasAuth) score += 2;

  // SDK references (1 point)
  const hasSDK = text.toLowerCase().includes('sdk') ||
                 text.toLowerCase().includes('library') ||
                 text.toLowerCase().includes('npm install') ||
                 text.toLowerCase().includes('pip install');
  if (hasSDK) score += 1;

  return Math.min(20, score);
}

// PILLAR 5: Context Efficiency (0-15 points)
function calculateContextEfficiency(text: string): number {
  let score = 4; // Base score

  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

  if (paragraphs.length === 0) return 4;

  // Calculate average paragraph length
  const avgLength = text.length / paragraphs.length;

  // Optimal paragraph length for agents: 150-600 chars (max 4 points)
  if (avgLength >= 150 && avgLength <= 600) score += 4;
  else if (avgLength >= 100 && avgLength <= 800) score += 2;

  // Check for summaries/TL;DR patterns (max 3 points)
  const hasSummary = text.toLowerCase().includes('summary') ||
                     text.toLowerCase().includes('tl;dr') ||
                     text.toLowerCase().includes('overview') ||
                     text.toLowerCase().includes('key points') ||
                     text.toLowerCase().includes('quick start') ||
                     text.toLowerCase().includes('getting started');
  if (hasSummary) score += 3;

  // Check for clear action items (max 2 points)
  const hasActions = text.toLowerCase().includes('how to') ||
                     text.toLowerCase().includes('steps') ||
                     text.toLowerCase().includes('install') ||
                     text.toLowerCase().includes('setup');
  if (hasActions) score += 2;

  // Check for information density - low fluff (max 2 points)
  const fluffWords = ['amazing', 'incredible', 'revolutionary', 'best-in-class', 
                      'cutting-edge', 'world-class', 'industry-leading', 'innovative'];
  const fluffCount = fluffWords.reduce((count, word) => {
    const regex = new RegExp(word, 'gi');
    const matches = text.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);

  // Low fluff = higher score
  if (fluffCount === 0) score += 2;
  else if (fluffCount < 3) score += 1;

  return Math.min(15, score);
}

function getA3Grade(overallScore: number): { grade: string; category: string } {
  if (overallScore >= 90) return { grade: "A+", category: "Agent-Native" };
  if (overallScore >= 80) return { grade: "A", category: "Agent-Optimized" };
  if (overallScore >= 70) return { grade: "B", category: "Agent-Ready" };
  if (overallScore >= 60) return { grade: "C", category: "Agent-Compatible" };
  if (overallScore >= 50) return { grade: "D", category: "Agent-Challenged" };
  return { grade: "F", category: "Agent-Opaque" };
}

function generateA3Recommendations(scores: any, data: any, files: AgentFiles) {
  const recommendations = [];
  const text = data.text || "";

  // Machine-Readability recommendations
  if (scores.machineReadability < 15) {
    recommendations.push({
      priority: "high",
      category: "Machine-Readability",
      title: "Reduce HTML/JavaScript bloat",
      description: "Your site has excessive code relative to content. Implement server-side rendering or static generation to improve text-to-code ratio.",
      impact: "High - Reduces token consumption and improves LLM parsing speed",
      action: "Implement SSR/SSG, remove render-blocking JS, extract inline CSS",
    });
  }

  // Semantic Depth recommendations
  if (scores.semanticDepth < 18) {
    recommendations.push({
      priority: "high",
      category: "Semantic Depth",
      title: "Improve heading hierarchy and structured data",
      description: "Add clear H1-H3 structure and implement Schema.org JSON-LD markup to help AI agents understand content organization.",
      impact: "High - Improves RAG chunking and content comprehension",
      action: "Add single H1, logical H2-H3 progression, implement JSON-LD schemas",
    });
  }

  // Agent Discovery recommendations - VERIFIED
  if (!files.llmsTxt.exists) {
    recommendations.push({
      priority: "high",
      category: "Agent Discovery",
      title: "Create llms.txt file",
      description: "You don't have an llms.txt file. This is the single most important file for AI agent discoverability.",
      impact: "Critical - Without this, AI agents cannot efficiently discover your content",
      action: "Create /llms.txt with links to key documentation and API references",
    });
  }

  if (!files.robotsTxt.exists) {
    recommendations.push({
      priority: "medium",
      category: "Agent Discovery",
      title: "Add robots.txt with LLM crawler directives",
      description: "Create robots.txt to guide AI crawlers (ChatGPT-User, Claude-Web, PerplexityBot, etc.).",
      impact: "Medium - Ensures proper crawling by AI agents",
      action: "Create robots.txt with User-agent rules for major LLM crawlers",
    });
  }

  if (!files.sitemapXml.exists && !files.sitemapIndex.exists) {
    recommendations.push({
      priority: "medium",
      category: "Agent Discovery",
      title: "Add XML sitemap",
      description: "Create sitemap.xml to help AI agents discover all your important pages.",
      impact: "Medium - Improves crawl efficiency and page discovery",
      action: "Generate sitemap.xml and submit to search consoles",
    });
  }

  // Programmatic Access recommendations - VERIFIED
  if (!files.openapiJson.exists && !files.openapiYaml.exists) {
    recommendations.push({
      priority: scores.programmaticAccess < 12 ? "high" : "medium",
      category: "Programmatic Access",
      title: "Add OpenAPI specification",
      description: "Create openapi.json or openapi.yaml to enable AI agents to understand and use your API.",
      impact: "High - Essential for AI agents to interact with your services",
      action: "Generate OpenAPI spec from your API, host at /openapi.json",
    });
  }

  if (!files.apiDocs.exists) {
    recommendations.push({
      priority: "medium",
      category: "Programmatic Access",
      title: "Create API documentation",
      description: "Add dedicated API documentation with code examples and authentication details.",
      impact: "Medium - Helps developers and AI agents use your API",
      action: "Create /api or /docs page with comprehensive API reference",
    });
  }

  // Context Efficiency recommendations
  if (scores.contextEfficiency < 10) {
    recommendations.push({
      priority: "medium",
      category: "Context Efficiency",
      title: "Optimize content for token efficiency",
      description: "Add concise summaries, reduce marketing fluff, and structure content for optimal LLM context window usage.",
      impact: "Medium - Improves information density and reduces token costs",
      action: "Add TL;DR sections, reduce paragraph length, remove buzzwords",
    });
  }

  // Future-proofing recommendation
  if (!files.mcpServer.exists) {
    recommendations.push({
      priority: "low",
      category: "Future-Proofing",
      title: "Implement Model Context Protocol (MCP)",
      description: "Expose core functionality via MCP to enable deep AI agent integration and tool use.",
      impact: "Low - Positions you for next-generation AI agent ecosystems",
      action: "Build MCP server, expose tools via protocol, document integration",
    });
  }

  return recommendations;
}

function generateA3Summary(scores: any, url: string, category: string) {
  const domain = new URL(url).hostname;

  const summaries: Record<string, string> = {
    "Agent-Native": `${domain} is Agent-Native (A+). Your site is optimized for AI agent consumption with excellent machine-readability, semantic structure, and programmatic access. You're well-positioned for the AI-first web.`,

    "Agent-Optimized": `${domain} is Agent-Optimized (A). Your site works well with AI agents but has minor optimization opportunities. A few improvements will maximize your AI visibility.`,

    "Agent-Ready": `${domain} is Agent-Ready (B). Your site is accessible to AI agents but needs improvements to compete effectively in AI-powered search. Focus on the high-priority recommendations.`,

    "Agent-Compatible": `${domain} is Agent-Compatible (C). Your site can be accessed by AI agents but has significant gaps in AI-friendliness. Implement the recommended changes to improve visibility.`,

    "Agent-Challenged": `${domain} is Agent-Challenged (D). Your site has poor AI accessibility and is likely being overlooked by AI answer engines. Major restructuring is recommended.`,

    "Agent-Opaque": `${domain} is Agent-Opaque (F). Your site is effectively invisible to AI agents. Immediate action is needed to implement basic AI accessibility features.`,
  };

  return summaries[category] || `${domain} has an AI accessibility score of ${scores.overall}/100. Review the recommendations to improve your site's visibility to AI agents.`;
}

// GET endpoint to retrieve audit results or leaderboard
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const auditId = searchParams.get("id");
  const leaderboardParam = searchParams.get("leaderboard");

  // Return leaderboard if requested
  if (leaderboardParam === "true") {
    const entries = Array.from(leaderboard.values())
      .sort((a, b) => b.score - a.score)
      .map((entry, index) => ({
        rank: index + 1,
        ...entry,
      }));
    return NextResponse.json({ entries, total: entries.length });
  }

  if (!auditId) {
    return NextResponse.json(
      { error: "Audit ID required" },
      { status: 400 }
    );
  }

  const audit = audits.get(auditId);

  if (!audit) {
    return NextResponse.json(
      { error: "Audit not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(audit);
}

// Type definitions
interface AgentFileStatus {
  exists: boolean;
  url: string | null;
}

interface AgentFiles {
  llmsTxt: AgentFileStatus;
  llmsFullTxt: AgentFileStatus;
  robotsTxt: AgentFileStatus;
  sitemapXml: AgentFileStatus;
  sitemapIndex: AgentFileStatus;
  openapiJson: AgentFileStatus;
  openapiYaml: AgentFileStatus;
  apiDocs: AgentFileStatus;
  mcpServer: AgentFileStatus;
}
