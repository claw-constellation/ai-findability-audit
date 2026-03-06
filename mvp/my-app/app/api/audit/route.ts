import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime (not Edge)
export const runtime = "nodejs";

// In-memory storage for audits (replace with database in production)
const audits = new Map();

// A3 Framework: AI-Agent Accessibility Scorecard
// Five Pillars of AI-Readiness

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

    // Start the A3 Framework analysis
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
    // Fetch website content
    const fetchResult = await fetchWebsiteContent(url);
    
    if (!fetchResult) {
      throw new Error("Unable to fetch website content");
    }

    // A3 Framework Analysis
    const a3Scores = calculateA3Scores(fetchResult, url);
    
    // Generate A3-based recommendations
    const recommendations = generateA3Recommendations(a3Scores, fetchResult);
    
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
      version: "1.0",
    };
  } catch (error) {
    console.error("A3 Analysis error:", error);
    throw error;
  }
}

async function fetchWebsiteContent(url: string) {
  // Try multiple methods to fetch content
  
  // Method 1: Jina AI Reader (free, reliable)
  try {
    const jinaResponse = await fetch(`https://r.jina.ai/http://${url.replace(/^https?:\/\//, "")}`, {
      headers: { "Accept": "application/json" },
      timeout: 15000,
    } as any);

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
        "User-Agent": "Mozilla/5.0 (compatible; A3-Audit/1.0)",
      },
      timeout: 15000,
    } as any);

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

function calculateA3Scores(data: any, url: string) {
  const text = data.text || "";
  const html = data.html || "";
  
  // A3 Framework: Five Pillars of AI-Readiness
  
  // Pillar 1: Machine-Readability (0-20 points)
  const machineReadability = calculateMachineReadability(text, html);
  
  // Pillar 2: Semantic Depth (0-25 points)
  const semanticDepth = calculateSemanticDepth(text, html);
  
  // Pillar 3: Agent Discovery (0-20 points)
  const agentDiscovery = calculateAgentDiscovery(text, url);
  
  // Pillar 4: Programmatic Access (0-20 points)
  const programmaticAccess = calculateProgrammaticAccess(text);
  
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
    // Text-only analysis
    return text.length > 1000 ? 15 : 10;
  }
  
  const textSize = text.length;
  const htmlSize = html.length;
  
  if (htmlSize === 0) return 10;
  
  // Calculate text-to-code ratio
  const ratio = textSize / htmlSize;
  
  // Score based on ratio
  if (ratio > 0.15) return 20;      // >80% text-to-code equivalent
  if (ratio > 0.10) return 15;      // 70-80% text-to-code
  if (ratio > 0.05) return 10;      // 50-70% text-to-code
  if (ratio > 0.02) return 5;       // 30-50% text-to-code
  return 2;                          // <30% text-to-code
}

// PILLAR 2: Semantic Depth (0-25 points)
function calculateSemanticDepth(text: string, html: string): number {
  let score = 10; // Base score
  
  // Check for heading patterns in text
  const h1Matches = (text.match(/^#\s+.+$/gm) || []).length;
  const h2Matches = (text.match(/^##\s+.+$/gm) || []).length;
  const h3Matches = (text.match(/^###\s+.+$/gm) || []).length;
  
  // Heading hierarchy quality
  if (h1Matches === 1) score += 3;
  if (h1Matches >= 1 && h2Matches >= 2) score += 4;
  if (h2Matches >= 2 && h3Matches >= 3) score += 4;
  
  // Check for structured content indicators
  const listItems = (text.match(/^[-*•]\s+/gm) || []).length;
  if (listItems >= 5) score += 2;
  
  // Check for links (indicates connected content)
  const links = (text.match(/https?:\/\/[^\s]+/g) || []).length;
  if (links >= 3) score += 2;
  
  // Check for code blocks (technical depth)
  const codeBlocks = (text.match(/```[\s\S]*?```/g) || []).length;
  if (codeBlocks >= 1) score += 2;
  
  // Check for table-like structures
  const tables = (text.match(/\|[^\n]+\|/g) || []).length;
  if (tables >= 3) score += 2;
  
  // Check for Schema.org/JSON-LD indicators in HTML
  if (html && html.includes('application/ld+json')) score += 4;
  if (html && html.includes('schema.org')) score += 2;
  
  return Math.min(25, score);
}

// PILLAR 3: Agent Discovery (0-20 points)
function calculateAgentDiscovery(text: string, url: string): number {
  let score = 5; // Base score for being accessible
  
  // Check for llms.txt indicators in content
  const hasLLMsTxt = text.toLowerCase().includes('llms.txt') || 
                     text.toLowerCase().includes('llm.txt');
  if (hasLLMsTxt) score += 5;
  
  // Check for robots.txt references
  const hasRobotsTxt = text.toLowerCase().includes('robots.txt');
  if (hasRobotsTxt) score += 2;
  
  // Check for sitemap references
  const hasSitemap = text.toLowerCase().includes('sitemap.xml') ||
                     text.toLowerCase().includes('sitemap');
  if (hasSitemap) score += 3;
  
  // Check for API documentation indicators
  const hasAPIDocs = text.toLowerCase().includes('api') &&
                     (text.toLowerCase().includes('documentation') ||
                      text.toLowerCase().includes('reference') ||
                      text.toLowerCase().includes('docs'));
  if (hasAPIDocs) score += 3;
  
  // Check for OpenAPI/Swagger indicators
  const hasOpenAPI = text.toLowerCase().includes('openapi') ||
                     text.toLowerCase().includes('swagger');
  if (hasOpenAPI) score += 2;
  
  return Math.min(20, score);
}

// PILLAR 4: Programmatic Access (0-20 points)
function calculateProgrammaticAccess(text: string): number {
  let score = 5; // Base score
  
  // Check for API endpoint patterns
  const apiPatterns = [
    /GET\s+\/\w+/i,
    /POST\s+\/\w+/i,
    /api\/.+/i,
    /\/v\d+\//i,
  ];
  
  let apiMatches = 0;
  apiPatterns.forEach(pattern => {
    if (pattern.test(text)) apiMatches++;
  });
  
  if (apiMatches >= 2) score += 5;
  if (apiMatches >= 4) score += 3;
  
  // Check for authentication documentation
  const hasAuth = text.toLowerCase().includes('authentication') ||
                  text.toLowerCase().includes('api key') ||
                  text.toLowerCase().includes('bearer token') ||
                  text.toLowerCase().includes('oauth');
  if (hasAuth) score += 3;
  
  // Check for code examples
  const hasCodeExamples = text.includes('```') ||
                          text.includes('curl') ||
                          /(javascript|python|java|php|ruby|go|rust)/i.test(text);
  if (hasCodeExamples) score += 3;
  
  // Check for SDK/library references
  const hasSDK = text.toLowerCase().includes('sdk') ||
                 text.toLowerCase().includes('library') ||
                 text.toLowerCase().includes('client');
  if (hasSDK) score += 2;
  
  // Check for webhook/event documentation
  const hasWebhooks = text.toLowerCase().includes('webhook') ||
                      text.toLowerCase().includes('event');
  if (hasWebhooks) score += 2;
  
  return Math.min(20, score);
}

// PILLAR 5: Context Efficiency (0-15 points)
function calculateContextEfficiency(text: string): number {
  let score = 5; // Base score
  
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  if (paragraphs.length === 0) return 5;
  
  // Calculate average paragraph length
  const avgLength = text.length / paragraphs.length;
  
  // Optimal paragraph length for agents: 200-500 chars
  if (avgLength >= 150 && avgLength <= 600) score += 4;
  else if (avgLength >= 100 && avgLength <= 800) score += 2;
  
  // Check for summaries/TL;DR patterns
  const hasSummary = text.toLowerCase().includes('summary') ||
                     text.toLowerCase().includes('tl;dr') ||
                     text.toLowerCase().includes('overview') ||
                     text.toLowerCase().includes('key points');
  if (hasSummary) score += 3;
  
  // Check for clear action items
  const hasActions = text.toLowerCase().includes('quick start') ||
                     text.toLowerCase().includes('getting started') ||
                     text.toLowerCase().includes('how to') ||
                     text.toLowerCase().includes('steps');
  if (hasActions) score += 3;
  
  // Check for information density (avoid marketing fluff)
  const fluffWords = ['amazing', 'incredible', 'revolutionary', 'best-in-class', 'cutting-edge'];
  const fluffCount = fluffWords.reduce((count, word) => {
    const regex = new RegExp(word, 'gi');
    const matches = text.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
  
  // Low fluff = higher score
  if (fluffCount < 3) score += 2;
  
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

function generateA3Recommendations(scores: any, data: any) {
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
  
  // Agent Discovery recommendations
  if (scores.agentDiscovery < 12) {
    recommendations.push({
      priority: "high",
      category: "Agent Discovery",
      title: "Implement llms.txt and optimize robots.txt",
      description: "Create /llms.txt file for AI agents and configure robots.txt for LLM crawlers (ChatGPT-User, Claude-Web, etc.).",
      impact: "High - Ensures AI agents can discover and access your content",
      action: "Create llms.txt, update robots.txt with LLM crawler directives, submit sitemap",
    });
  }
  
  // Programmatic Access recommendations
  if (scores.programmaticAccess < 12) {
    recommendations.push({
      priority: "medium",
      category: "Programmatic Access",
      title: "Add API documentation and OpenAPI spec",
      description: "Document your API with OpenAPI/Swagger specification and provide code examples for programmatic access.",
      impact: "Medium - Enables AI agents to interact with your services",
      action: "Create OpenAPI spec, add API reference docs, provide SDKs",
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
  
  // Always add MCP recommendation for future-proofing
  recommendations.push({
    priority: "low",
    category: "Future-Proofing",
    title: "Implement Model Context Protocol (MCP)",
    description: "Expose core functionality via MCP to enable deep AI agent integration and tool use.",
    impact: "Low - Positions you for next-generation AI agent ecosystems",
    action: "Build MCP server, expose tools via protocol, document integration",
  });
  
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

// GET endpoint to retrieve audit results
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const auditId = searchParams.get("id");

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
