import { NextRequest, NextResponse } from "next/server";

// In-memory storage for audits (replace with database in production)
const audits = new Map();

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

    // Start the analysis (in production, this would be a background job)
    const analysis = await analyzeWebsite(validatedUrl.toString());

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

async function analyzeWebsite(url: string) {
  try {
    // Try Firecrawl first (if API key available)
    const firecrawlResult = await tryFirecrawl(url);
    
    // Fallback to Jina AI Reader (free tier)
    if (!firecrawlResult) {
      const jinaResult = await tryJinaReader(url);
      if (jinaResult) {
        return calculateScores(jinaResult, url);
      }
    } else {
      return calculateScores(firecrawlResult, url);
    }

    // If both fail, return error
    throw new Error("Unable to analyze website");
  } catch (error) {
    console.error("Analysis error:", error);
    throw error;
  }
}

async function tryFirecrawl(url: string) {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "html"],
        onlyMainContent: true,
      }),
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function tryJinaReader(url: string) {
  try {
    const response = await fetch(`https://r.jina.ai/http://${url.replace(/^https?:\/\//, "")}`, {
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) return null;
    
    const text = await response.text();
    return {
      markdown: text,
      metadata: {},
    };
  } catch {
    return null;
  }
}

function calculateScores(data: any, url: string) {
  const markdown = data.markdown || data.data?.markdown || "";
  const html = data.html || data.data?.html || "";
  
  // Calculate metrics
  const metrics = {
    // Token efficiency (lower is better for LLMs)
    tokenEfficiency: calculateTokenEfficiency(markdown, html),
    
    // Semantic structure quality
    semanticStructure: analyzeSemanticStructure(markdown),
    
    // Content clarity
    contentClarity: analyzeContentClarity(markdown),
    
    // Schema markup presence (simulated - would check actual JSON-LD)
    schemaMarkup: Math.floor(Math.random() * 40) + 30, // Placeholder
    
    // Overall AI-readability
    overall: 0,
  };

  // Calculate overall score
  metrics.overall = Math.round(
    (metrics.tokenEfficiency * 0.25 +
      metrics.semanticStructure * 0.30 +
      metrics.contentClarity * 0.25 +
      metrics.schemaMarkup * 0.20)
  );

  // Generate recommendations
  const recommendations = generateRecommendations(metrics, markdown);

  return {
    scores: metrics,
    recommendations,
    summary: generateSummary(metrics, url),
    pageCount: 1, // For single-page analysis
    wordCount: markdown.split(/\s+/).length,
  };
}

function calculateTokenEfficiency(markdown: string, html: string): number {
  if (!html || html.length === 0) return 50;
  
  // Calculate ratio of meaningful content to HTML markup
  const htmlSize = html.length;
  const markdownSize = markdown.length;
  
  if (htmlSize === 0) return 50;
  
  // Higher ratio = more efficient (less HTML cruft)
  const ratio = markdownSize / htmlSize;
  
  // Score: 0-100
  return Math.min(100, Math.round(ratio * 200));
}

function analyzeSemanticStructure(markdown: string): number {
  let score = 50; // Base score
  
  // Check for headings
  const h1Count = (markdown.match(/^# /gm) || []).length;
  const h2Count = (markdown.match(/^## /gm) || []).length;
  const h3Count = (markdown.match(/^### /gm) || []).length;
  
  // Good heading structure
  if (h1Count === 1) score += 10;
  if (h2Count >= 2) score += 10;
  if (h3Count >= 3) score += 10;
  
  // Check for lists (structured data)
  const listItems = (markdown.match(/^[-*] /gm) || []).length;
  if (listItems >= 5) score += 10;
  
  // Check for links
  const links = (markdown.match(/\[.*?\]\(.*?\)/g) || []).length;
  if (links >= 3) score += 10;
  
  return Math.min(100, score);
}

function analyzeContentClarity(markdown: string): number {
  let score = 50;
  
  // Average paragraph length (shorter is generally better for LLMs)
  const paragraphs = markdown.split(/\n\n+/);
  const avgParagraphLength = paragraphs.reduce((sum, p) => sum + p.length, 0) / paragraphs.length;
  
  if (avgParagraphLength < 500) score += 20;
  else if (avgParagraphLength < 800) score += 10;
  
  // Presence of key business information
  const hasPricing = /price|pricing|cost|\$/i.test(markdown);
  const hasContact = /contact|email|phone|address/i.test(markdown);
  const hasAbout = /about|company|team/i.test(markdown);
  
  if (hasPricing) score += 10;
  if (hasContact) score += 10;
  if (hasAbout) score += 10;
  
  return Math.min(100, score);
}

function generateRecommendations(metrics: any, markdown: string) {
  const recommendations = [];
  
  if (metrics.tokenEfficiency < 60) {
    recommendations.push({
      priority: "high",
      category: "Technical",
      title: "Reduce HTML markup bloat",
      description: "Your site has excessive HTML relative to content. Implement a clean Markdown layer for AI crawlers.",
      impact: "High - Reduces token consumption for LLM parsing",
    });
  }
  
  if (metrics.semanticStructure < 60) {
    recommendations.push({
      priority: "high",
      category: "Structure",
      title: "Improve heading hierarchy",
      description: "Add clear H1, H2, H3 structure to help AI systems understand your content organization.",
      impact: "High - Improves content comprehension by LLMs",
    });
  }
  
  if (metrics.schemaMarkup < 50) {
    recommendations.push({
      priority: "medium",
      category: "Schema",
      title: "Add JSON-LD structured data",
      description: "Implement schema.org markup for your business type, products, and services.",
      impact: "Medium - Increases likelihood of AI citations",
    });
  }
  
  if (metrics.contentClarity < 60) {
    recommendations.push({
      priority: "medium",
      category: "Content",
      title: "Create AI-readable content sections",
      description: "Add concise summaries and FAQ sections that AI systems can easily extract.",
      impact: "Medium - Improves answer relevance in AI search",
    });
  }
  
  // Always add this as a best practice
  recommendations.push({
    priority: "low",
    category: "Future-proofing",
    title: "Consider implementing /llm.txt",
    description: "Create a dedicated endpoint with clean, structured content specifically for AI consumption.",
    impact: "Low - Positions you for future AI search developments",
  });
  
  return recommendations;
}

function generateSummary(metrics: any, url: string) {
  const domain = new URL(url).hostname;
  
  if (metrics.overall >= 75) {
    return `${domain} has good AI-readability. With a few optimizations, you can significantly increase visibility in AI answer engines.`;
  } else if (metrics.overall >= 50) {
    return `${domain} has moderate AI-readability. Several improvements are needed to compete effectively in AI-powered search.`;
  } else {
    return `${domain} has poor AI-readability. Your content is likely being overlooked by AI answer engines. Significant improvements recommended.`;
  }
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
