# AI Findability Audit

> Analyze your website's AI-readability and get actionable recommendations to appear in Perplexity, ChatGPT, and Google AI Overviews.

**Live Demo:** https://ai-findability-audit.vercel.app

---

## The Problem

69% of searches now end without a click. AI answer engines bypass websites entirely. If AI can't read, understand, and cite your content — you don't exist in the AI-first web.

Traditional SEO is failing because:
- AI agents don't use browsers like humans
- JavaScript-heavy sites bury actual content
- Missing structured data prevents comprehension
- No programmatic access for agent workflows

---

## The Solution: A3 Framework

The **AI-Agent Accessibility (A3) Framework** scores websites across five pillars:

| Pillar | Weight | What It Measures |
|--------|--------|------------------|
| **Machine-Readability** | 20% | Clean HTML vs JavaScript bloat |
| **Semantic Depth** | 25% | Heading hierarchy, structured data |
| **Agent Discovery** | 20% | llms.txt, robots.txt, sitemaps |
| **Programmatic Access** | 20% | OpenAPI specs, API documentation |
| **Context Efficiency** | 15% | Token-optimized content |

### Grading Scale

| Grade | Score | Category |
|-------|-------|----------|
| A+ | 90-100 | Agent-Native |
| A | 80-89 | Agent-Optimized |
| B | 70-79 | Agent-Ready |
| C | 60-69 | Agent-Compatible |
| D | 50-59 | Agent-Challenged |
| F | 0-49 | Agent-Opaque |

---

## Features

- **Automated Analysis** — Deep crawl using AI-native tools (Jina AI Reader)
- **Verified Scoring** — Actually checks for llms.txt, OpenAPI specs, etc.
- **Live Leaderboard** — Compare against major tech companies
- **Actionable Recommendations** — Prioritized by impact and effort
- **Free Tier** — Basic analysis with email delivery

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Content Extraction:** Jina AI Reader

---

## API

### POST /api/audit
Submit a website for analysis.

```bash
curl -X POST https://ai-findability-audit.vercel.app/api/audit \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","email":"user@example.com"}'
```

Response:
```json
{
  "auditId": "abc-123",
  "status": "completed"
}
```

### GET /api/audit?id={id}
Retrieve detailed audit results.

### GET /api/audit?leaderboard=true
Get live leaderboard rankings.

---

## Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── audit/
│   │       └── route.ts       # A3 Framework scoring engine
│   ├── audit/
│   │   └── [id]/
│   │       └── page.tsx       # Audit results display
│   ├── leaderboard/
│   │   └── page.tsx           # Live rankings
│   ├── methodology/
│   │   └── page.tsx           # A3 Framework docs
│   ├── api/
│   │   └── page.tsx           # API documentation
│   ├── page.tsx               # Home / audit tool
│   └── layout.tsx
├── public/
│   ├── llms.txt               # AI agent documentation
│   ├── robots.txt             # Crawler directives
│   ├── sitemap.xml            # Page discovery
│   └── openapi.json           # API specification
└── package.json
```

---

## Agent Files

The tool checks for these AI-specific files:

| File | Purpose | Status |
|------|---------|--------|
| `/llms.txt` | AI agent documentation | ✅ Implemented |
| `/llms-full.txt` | Extended documentation | ⏳ Optional |
| `/robots.txt` | Crawler access rules | ✅ Implemented |
| `/sitemap.xml` | Page discovery | ✅ Implemented |
| `/openapi.json` | API specification | ✅ Implemented |
| `/mcp` | Model Context Protocol | ⏳ Future |

---

## Development

```bash
# Install dependencies
cd my-app && npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## Testing

Run the test suite:

```bash
npm test
```

Tests cover:
- A3 Framework scoring accuracy
- Heading detection (hash-style and underline-style)
- Agent file verification
- API endpoint functionality

---

## Roadmap

- [x] MVP audit tool with A3 Framework
- [x] Live leaderboard
- [x] API with OpenAPI spec
- [x] Methodology documentation
- [ ] PDF report generation
- [ ] Historical tracking
- [ ] MCP server implementation
- [ ] Stripe integration for paid tiers

---

## Sample Scores

| Website | Score | Grade | Notes |
|---------|-------|-------|-------|
| Moltbook | 66 | C | Excellent semantic structure, missing agent files |
| Our Site | 66 | C | Good agent files, JS bloat hurts readability |
| (Add yours!) | | | |

---

## License

MIT

---

**Built by Claw Constellation** 🦞
