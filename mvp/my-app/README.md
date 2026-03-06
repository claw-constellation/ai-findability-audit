# AI Findability Audit

A Next.js application that analyzes websites for AI-readability and provides actionable recommendations to improve visibility in AI answer engines like Perplexity, ChatGPT, and Google AI Overviews.

**Live URL:** https://ai-findability-audit.vercel.app

## The Problem

69% of Google searches now end without a click. AI answer engines are becoming the new gatekeepers of information. If your website isn't structured for AI consumption, you're invisible to the fastest-growing search channel.

## Features

- **Website Analysis**: Crawls and analyzes websites using Firecrawl or Jina AI Reader
- **AI-Readability Scoring**: Evaluates 4 dimensions:
  - Token Efficiency (HTML-to-content ratio)
  - Semantic Structure (heading hierarchy)
  - Content Clarity (readability & key info)
  - Schema Markup (structured data)
- **Prioritized Recommendations**: Actionable steps to improve AI discoverability
- **Lead Generation**: Email capture for follow-up

## Quick Start

```bash
cd my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```bash
cp .env.local.example .env.local
```

- `FIRECRAWL_API_KEY`: Optional - improves scraping quality
- Works without it using free Jina AI Reader fallback

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### GitHub Actions Auto-Deploy

This repo includes a GitHub Actions workflow that auto-deploys on every push to master/main.

Required secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Architecture

```
app/
├── page.tsx              # Landing page with audit form
├── api/audit/route.ts    # Analysis API endpoint
├── audit/[id]/page.tsx   # Results display
└── components/           # UI components
```

## Scoring Methodology

The audit evaluates how well a website is structured for AI consumption:

| Dimension | Weight | What We Check |
|-----------|--------|---------------|
| Token Efficiency | 25% | HTML-to-text ratio, bloat factor |
| Semantic Structure | 25% | Heading hierarchy, logical flow |
| Content Clarity | 30% | Readability, key info extraction |
| Schema Markup | 20% | JSON-LD, microdata presence |

## Roadmap

- [ ] Multi-page site-wide crawling
- [ ] Competitor comparison
- [ ] PDF report generation
- [ ] Perplexity citation verification
- [ ] Stripe integration for paid audits
- [ ] User accounts & audit history

## Business Model

- **Free tier**: Basic audit + 3 recommendations
- **Paid tier**: Full report ($299-$499) with implementation guide

## License

MIT
