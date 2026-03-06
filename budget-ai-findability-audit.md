# Budget Proposal: AI Findability Audit MVP
## Phase 1: Audit Tool Development & Launch
### March 2026

---

## Executive Summary

**Total Phase 1 Budget: $2,500 - $4,000**
**Timeline: 4-6 weeks to first paying customer**
**Goal: Validate demand with working audit tool + 10+ pilot customers**

---

## 1. Infrastructure & Tools

### 1.1 Required SaaS Subscriptions

| Service | Plan | Monthly Cost | Purpose |
|---------|------|--------------|---------|
| **Firecrawl** | Hobby | $16/mo | Website → Markdown/structured data |
| **Vercel** | Pro | $20/mo | Hosting + serverless functions |
| **Supabase** | Pro | $25/mo | Database + auth + storage |
| **OpenAI API** | Pay-as-you-go | ~$50/mo | Report generation, analysis |
| **Resend** | Free tier | $0 | Transactional emails |
| **Stripe** | Standard | 2.9% + $0.30 | Payment processing |
| **Domain** | Purchase | ~$15/yr | Brand domain |

**Subtotal (Monthly): ~$111/mo**
**First 3 Months: ~$333**

### 1.2 One-Time Setup Costs

| Item | Cost | Notes |
|------|------|-------|
| Domain registration | $15 | .com or .ai domain |
| Logo/design assets | $0 | Use AI generation (free) |
| Legal templates (privacy/TOS) | $0 | Use free templates |
| **Subtotal** | **$15** | |

---

## 2. Development Costs

### 2.1 Option A: Self-Build (Recommended for Phase 1)

| Component | Effort | Approach |
|-----------|--------|----------|
| Audit engine (Firecrawl integration) | 2-3 days | Next.js API routes |
| Scoring algorithm | 2-3 days | Rule-based + LLM evaluation |
| Report generation (PDF) | 1-2 days | React-PDF or similar |
| Landing page + UI | 2-3 days | Next.js + Tailwind |
| Stripe integration | 1 day | Stripe Checkout |
| Email automation | 1 day | Resend + React Email |

**Total Build Time: 2-3 weeks**
**Cost: $0 (your time)**

### 2.2 Option B: Outsource Development

If you prefer not to build:

| Role | Duration | Est. Cost |
|------|----------|-----------|
| Full-stack developer (contract) | 3-4 weeks | $3,000-$5,000 |
| UI/UX designer (contract) | 1 week | $500-$1,000 |

**Subtotal: $3,500-$6,000**

**Recommendation:** Self-build for Phase 1. The tech stack is straightforward, and you'll need to understand the internals to iterate.

---

## 3. Marketing & Customer Acquisition

### 3.1 Initial Launch (Month 1-2)

| Activity | Cost | Expected Outcome |
|----------|------|------------------|
| Free audits for 20 target companies | $0 (time) | Case studies, testimonials |
| LinkedIn outreach (manual) | $0 | 5-10 conversations |
| Twitter/X content | $0 | Thought leadership |
| Indie Hackers / Hacker News launch | $0 | Early adopters |

### 3.2 Paid Acquisition (Month 3+)

| Channel | Monthly Budget | Expected CAC |
|---------|----------------|--------------|
| Google Ads (AI SEO keywords) | $200-$500 | $100-$200 |
| LinkedIn Ads (B2B targeting) | $300-$500 | $150-$300 |
| Sponsored newsletter placements | $200-$500 | $80-$150 |

**Recommended: Start with $0 paid spend.** Use free audits as your acquisition channel.

---

## 4. Operating Costs (Monthly Run Rate)

### 4.1 Minimum Viable Operation

| Category | Monthly Cost |
|----------|--------------|
| Infrastructure (Firecrawl, Vercel, Supabase, OpenAI) | $111 |
| Paid acquisition (optional) | $0-$500 |
| Miscellaneous (tools, domains) | $20 |
| **Total Monthly Burn** | **$131-$631** |

### 4.2 At Scale (100 audits/month)

| Category | Monthly Cost |
|----------|--------------|
| Firecrawl (Standard plan) | $83 |
| Vercel (Pro) | $20 |
| Supabase (Pro) | $25 |
| OpenAI API (higher volume) | $200 |
| Email (Resend paid) | $20 |
| **Total Monthly Burn** | **~$368** |

---

## 5. Revenue Projections

### 5.1 Conservative Scenario

| Month | Audits | Conversion | Remediation Deals | Revenue |
|-------|--------|------------|-------------------|---------|
| 1 | 5 | 0% | 0 | $0 |
| 2 | 10 | 10% | 1 | $5,000 |
| 3 | 20 | 15% | 3 | $15,000 |
| 6 | 50 | 15% | 7 | $35,000 |

### 5.2 Optimistic Scenario

| Month | Audits | Conversion | Remediation Deals | Revenue |
|-------|--------|------------|-------------------|---------|
| 1 | 10 | 10% | 1 | $5,000 |
| 2 | 25 | 15% | 4 | $20,000 |
| 3 | 50 | 20% | 10 | $50,000 |
| 6 | 100 | 20% | 20 | $100,000 |

**Break-even: Month 2-3** (assuming self-build)

---

## 6. Budget Summary

### Phase 1 (MVP Launch): $2,500 - $4,000

| Category | Min | Max |
|----------|-----|-----|
| Infrastructure (3 months) | $333 | $333 |
| One-time setup | $15 | $15 |
| Development (if outsourced) | $0 | $3,000 |
| Initial marketing | $0 | $500 |
| Buffer (10%) | $35 | $385 |
| **Total** | **$383** | **$4,233** |

### Recommended Budget: $2,000

- Self-build the MVP
- $333 infrastructure (3 months runway)
- $500 for unexpected tools/API costs
- $1,000 for paid acquisition testing (Month 2-3)
- $167 buffer

---

## 7. Decision Points

### Decision 1: Build vs. Outsource
- **Build yourself:** $400 total, 2-3 weeks, full control
- **Outsource:** $4,000+ total, 3-4 weeks, faster but less control

**My recommendation:** Build yourself. The tech is straightforward (Next.js + Firecrawl + OpenAI), and you need to understand the domain deeply.

### Decision 2: Free vs. Paid Audit Tier
- **Free tier:** More leads, lower quality, higher volume
- **Paid only ($99+):** Fewer leads, higher intent, immediate revenue

**My recommendation:** Free basic score + paid full report ($299-$499). Use free tier for lead gen.

### Decision 3: Target Market Focus
- **Broad:** Any B2B company (larger TAM, harder to message)
- **Narrow:** Specific vertical (e.g., SaaS, legal) (smaller TAM, easier to sell)

**My recommendation:** Start narrow. Pick one vertical where you have connections or can easily identify targets.

---

## 8. Next Steps

1. **Approve budget** ($2,000 recommended)
2. **Choose vertical** (SaaS? Legal? Healthcare?)
3. **Register domain** (~$15)
4. **Set up Firecrawl + Vercel + Supabase** (~$61/mo)
5. **Build MVP** (2-3 weeks)
6. **Launch with 5 free audits** to target companies
7. **Iterate based on feedback**

---

*Budget Version: 1.0*
*Last Updated: March 6, 2026*
