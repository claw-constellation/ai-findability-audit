# Market Requirements Document (MRD)
## AI-First Website Audit & Optimization Service
### Version 1.0 | March 6, 2026

---

## 1. Executive Summary

### The Problem
The web is undergoing a fundamental shift from human-first to AI-first discovery. Traditional SEO strategies are failing as AI answer engines (Perplexity, ChatGPT, Google AI Overviews) bypass websites entirely, delivering answers directly to users. **Zero-click searches now account for 69% of all queries** (up from 56% in May 2024), and businesses are experiencing **30-70% traffic losses** without understanding why.

### The Opportunity
A new discipline — **Generative Engine Optimization (GEO)** — is emerging. Businesses need to become "AI-findable" or risk invisibility. The AI marketing industry is projected to grow from **$20.4B (2024) to $82.2B (2030)** at ~25% CAGR. GenAI search ad spending in the US will double between 2025-2026, exceeding **$25 billion**.

### Our Solution
An **AI Findability Audit** service that:
1. Analyzes websites for AI-readability using production-grade scraping tools
2. Scores visibility across Perplexity, ChatGPT, Google AI Overviews
3. Provides actionable remediation roadmap
4. (Future) Implements AI-readable layer and MCP endpoints

---

## 2. Market Analysis

### 2.1 Market Size & Growth

| Metric | Value | Source |
|--------|-------|--------|
| AI Marketing Industry (2024) | $20.4B | Omnius GEO Report |
| AI Marketing Industry (2030) | $82.2B | Omnius GEO Report |
| CAGR | ~25% | Omnius GEO Report |
| GenAI Search Ad Spend (2026) | $25B+ | Industry projections |
| Zero-Click Search Rate | 69% | Similarweb (May 2025) |
| Google AI Overview Coverage | 60% of US searches | Xamsor Blog (Nov 2025) |
| Gen Z Using AI Chatbots for Search | 35% | Semrush |

### 2.2 Key Market Dynamics

**The Visibility Crisis:**
- 92% of users don't click past AI-generated answers (Perplexity, Google SGE)
- Customer acquisition costs increased 60% over past 5 years
- Traditional SEO (keyword density, backlinks) failing to yield returns
- AI Overviews appear in 60% of Google searches (US)

**The Shift:**
- ChatGPT processes ~2.5B queries/day, on pace to overtake Google by 2027
- SEO is becoming "two jobs": driving human clicks + supplying clean inputs for AI agents
- New discipline: Generative Engine Optimization (GEO)

### 2.3 Competitive Landscape

**Direct Competitors (Emerging):**
- **Omnius.so** — GEO platform with AI visibility tracking
- **Scrunch AI** — AI search optimization
- **BrightEdge** — Added Perplexity/AI tracking to existing SEO platform
- **Traditional SEO agencies** — Pivoting to add "AI SEO" services

**Indirect Competitors:**
- Content marketing agencies
- Technical SEO consultants
- Web development shops

**Our Differentiation:**
- Specialized focus on AI-readability (not general SEO)
- Automated audit generation (scalable, fast)
- Clear remediation roadmap (not just reports)
- Future path to MCP/agent commerce integration

---

## 3. Target Customer Segments

### 3.1 Primary: High-LTV B2B Services

**Profile:**
- Enterprise SaaS companies
- Legal/financial consultancies
- Healthcare providers (medical spas, specialized clinics)
- Professional services (accounting, architecture, engineering)

**Pain Points:**
- High customer lifetime value ($10K-$100K+)
- Dependent on inbound leads
- Seeing declining organic traffic
- Competitors appearing in AI citations, they're not

**Value Proposition:**
- Single Perplexity citation could generate qualified leads worth thousands
- AI visibility = competitive moat as market shifts

### 3.2 Secondary: Content-Heavy Businesses

**Profile:**
- Publishers and media companies
- E-commerce with complex catalogs
- Educational platforms
- Research organizations

**Pain Points:**
- Content not being surfaced by AI answer engines
- Investment in content marketing not yielding visibility

### 3.3 Tertiary: Early Adopters

**Profile:**
- Tech-forward companies
- AI-native startups
- Companies already experimenting with AI tools

**Value Proposition:**
- Future-proofing for agent-to-agent commerce
- First-mover advantage in AI discoverability

---

## 4. Product Requirements

### 4.1 MVP: AI Findability Audit Tool

**Core Functionality:**

1. **Website Crawling & Analysis**
   - Input: Target domain URL
   - Process: Deep crawl using Firecrawl/Jina AI
   - Output: Structured data on AI-readability

2. **AI-Readability Scoring**
   - Semantic structure quality
   - JSON-LD/schema markup presence
   - Content hierarchy for LLM parsing
   - Token efficiency (how "expensive" is the site to parse)
   - Comparison to top 3 competitors

3. **Citation Audit**
   - Perplexity citation check (are they being cited?)
   - Google AI Overview appearance tracking
   - ChatGPT browsing visibility (if testable)

4. **Remediation Report**
   - Prioritized action items
   - Estimated impact (traffic recovery projection)
   - Implementation roadmap
   - Pricing for remediation service

### 4.2 Technical Requirements

**Data Sources:**
- Firecrawl API (website → Markdown/structured data)
- Jina AI Reader (alternative/supplement)
- Perplexity API (if available) or manual sampling
- Google Search Console data (client-provided)

**Scoring Algorithm:**
- Token density score (lower = better for LLMs)
- Semantic structure score (heading hierarchy, entity extraction)
- Schema completeness score
- Competitor benchmark comparison

**Output Formats:**
- PDF report (client-facing)
- JSON data (for future automation)
- Web dashboard (future)

### 4.3 Future Phases

**Phase 2: Remediation Service**
- Manual implementation of AI-readable layer
- Markdown endpoint creation (/llm.txt)
- JSON-LD schema optimization
- Dual-layer rendering setup

**Phase 3: MCP Integration**
- Model Context Protocol endpoint installation
- Agent commerce readiness
- Stripe Agent Toolkit integration

**Phase 4: Autonomous Agency**
- LangGraph orchestration
- Multi-agent workflows
- Fully automated sales → fulfillment pipeline

---

## 5. Go-to-Market Strategy

### 5.1 Pricing Strategy

**Audit Tool (MVP):**
- **Free tier:** Basic score + 1-page analysis (lead gen)
- **Standard audit:** $500-$1,500 (full site analysis + report)
- **Enterprise audit:** $2,500-$5,000 (competitive analysis + executive presentation)

**Remediation Service (Phase 2):**
- **Implementation fee:** $5,000-$15,000 (one-time, based on site complexity)
- **Monthly maintenance:** $500-$1,500 (monitoring + updates)

**Agent Commerce Layer (Phase 3):**
- **Setup:** $10,000-$25,000
- **Transaction fee:** 0.5-1% of autonomous transaction volume

### 5.2 Customer Acquisition

**Channel 1: Demonstration-as-Marketing**
- Generate free audits for target companies
- Send personalized reports showing exactly what they're losing
- "Your competitor X is cited by Perplexity 47 times. You're cited 0 times."

**Channel 2: Content Marketing**
- Publish research on AI visibility trends
- Case studies of traffic recovery post-optimization
- "The Death of SEO, Birth of GEO" thought leadership

**Channel 3: Partnerships**
- Traditional SEO agencies (white-label service)
- Web development shops (add-on service)
- AI tool platforms (integration partner)

### 5.3 Sales Motion

**Low-Touch (Self-Serve):**
- Free audit tool on website
- Automated report generation
- Stripe payment for full report

**High-Touch (Enterprise):**
- Outbound to target accounts
- Custom audit presentation
- Consultative sales process

---

## 6. Success Metrics

### 6.1 Business Metrics

| Metric | Target (6 months) | Target (12 months) |
|--------|-------------------|-------------------|
| Audits Generated | 100 | 500 |
| Audit-to-Remediation Conversion | 15% | 20% |
| Average Deal Size (Remediation) | $8,000 | $10,000 |
| Monthly Recurring Revenue | $10,000 | $50,000 |
| Customer Acquisition Cost | <$500 | <$400 |

### 6.2 Product Metrics

| Metric | Target |
|--------|--------|
| Audit Generation Time | <5 minutes |
| Report Accuracy | >90% (validated against manual checks) |
| Customer Satisfaction (NPS) | >50 |
| Traffic Recovery (post-remediation) | +30% within 90 days |

---

## 7. Risk Analysis

### 7.1 Market Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| AI platforms change how they ingest content | High | High | Stay closely integrated with Firecrawl/MCP ecosystem; build adaptability into scoring |
| Market education required (customers don't know they need this) | High | Medium | Lead with free audits; demonstrate value before asking for payment |
| Traditional SEO agencies pivot quickly | Medium | Medium | Focus on technical implementation, not just consulting |

### 7.2 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Scraping reliability (site blocks, dynamic content) | Medium | Medium | Use Firecrawl (handles this); have fallback methods |
| AI platform APIs change/disappear | Medium | High | Build abstraction layer; don't over-index on single platform |
| Scoring algorithm doesn't correlate with actual visibility | Medium | High | Validate against real citation data; iterate quickly |

### 7.3 Execution Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Can't deliver remediation at quality/speed promised | Medium | High | Start with manual fulfillment; automate gradually |
| Customer expectations misaligned | Medium | Medium | Clear SLAs; education during sales process |

---

## 8. Appendix: Data Sources

- Search Engine Land: "The future of AI search: What 6 SEO leaders predict for 2026" (Jan 2026)
- Omnius.so: "GEO Industry Report 2025" (Aug 2025)
- Semrush: "AI SEO Statistics for 2026" (Nov 2025)
- Similarweb: Zero-click search data (May 2025)
- BrightEdge: Perplexity optimization research
- Search Influence: "AI SEO Tracking Tools 2026" (Feb 2026)
- Digital Bloom: "2025 Organic Traffic Crisis Report" (Oct 2025)
- Search Engine Journal: "Google AI Overviews Impact" (Oct 2025)

---

*Document Version: 1.0*
*Last Updated: March 6, 2026*
*Author: AI Product Research*
