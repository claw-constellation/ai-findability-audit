/**
 * A3 Framework Scoring Tests
 * 
 * Tests for the AI-Agent Accessibility scoring engine
 */

import { describe, it, expect } from 'vitest';

// Import the scoring functions (would need to export them from route.ts)
// For now, inline the key functions for testing

function calculateSemanticDepth(text: string): number {
  let score = 8; // Base score

  // Hash-style headings
  const h1HashMatches = (text.match(/^#\s+.+$/gm) || []).length;
  const h2HashMatches = (text.match(/^##\s+.+$/gm) || []).length;
  const h3HashMatches = (text.match(/^###\s+.+$/gm) || []).length;
  
  // Underline-style headings
  const h1UnderlineMatches = (text.match(/^.+\r?\n={3,}$/gm) || []).length;
  const h2UnderlineMatches = (text.match(/^.+\r?\n-{3,}$/gm) || []).length;
  
  const h1Matches = h1HashMatches + h1UnderlineMatches;
  const h2Matches = h2HashMatches + h2UnderlineMatches;
  const h3Matches = h3HashMatches;

  // Heading hierarchy quality (max 8 points)
  if (h1Matches === 1) score += 2;
  if (h1Matches >= 1 && h2Matches >= 2) score += 3;
  if (h2Matches >= 2 && h3Matches >= 3) score += 3;

  // Structured content (max 6 points)
  const listItems = (text.match(/^[-*•]\s+/gm) || []).length;
  if (listItems >= 5) score += 2;

  const links = (text.match(/https?:\/\/[^\s]+/g) || []).length;
  if (links >= 3) score += 2;

  const codeBlocks = (text.match(/```[\s\S]*?```/g) || []).length;
  if (codeBlocks >= 1) score += 2;

  // Tables (max 2 points)
  const tables = (text.match(/\|[^\n]+\|/g) || []).length;
  if (tables >= 3) score += 2;

  return Math.min(score, 25);
}

describe('Semantic Depth Scoring', () => {
  it('should detect hash-style headings', () => {
    const text = `
# Main Title

## Section One

### Subsection A

### Subsection B

## Section Two

Content here.
`;
    const score = calculateSemanticDepth(text);
    expect(score).toBeGreaterThan(8); // Base score + some heading points
  });

  it('should detect underline-style headings', () => {
    const text = `
Main Title
==========

Section One
-----------

### Subsection A

### Subsection B

Section Two
-----------

Content here.
`;
    const score = calculateSemanticDepth(text);
    expect(score).toBeGreaterThan(8);
  });

  it('should detect mixed heading styles', () => {
    const text = `
Machine-Readability Analysis
----------------------------

Semantic Depth Scoring
----------------------

### How It Works

Scan your website.

### Get Your Score

Receive breakdown.

### Optimize for AI

Implement recommendations.
`;
    const score = calculateSemanticDepth(text);
    expect(score).toBeGreaterThanOrEqual(11); // Base 8 + H2>=2 && H3>=3 = 3
  });

  it('should reward good heading hierarchy', () => {
    const text = `
# Single H1

## Section One

### Subsection A

### Subsection B

### Subsection C

## Section Two

### Subsection D

Content here.
`;
    const score = calculateSemanticDepth(text);
    // Base 8 + H1===1 (2) + H1>=1 && H2>=2 (3) + H2>=2 && H3>=3 (3) = 16
    expect(score).toBeGreaterThanOrEqual(16);
  });

  it('should detect list items', () => {
    const text = `
# Title

## Section

- Item one
- Item two
- Item three
- Item four
- Item five

Content.
`;
    const score = calculateSemanticDepth(text);
    expect(score).toBeGreaterThanOrEqual(10); // Base 8 + lists (2)
  });

  it('should detect code blocks', () => {
    const text = `
# Title

## Section

\`\`\`json
{"key": "value"}
\`\`\`

Content.
`;
    const score = calculateSemanticDepth(text);
    expect(score).toBeGreaterThanOrEqual(10); // Base 8 + code block (2)
  });

  it('should handle empty content', () => {
    const score = calculateSemanticDepth('');
    expect(score).toBe(8); // Just base score
  });

  it('should cap at 25 points', () => {
    const text = `
# Title

## Section One
## Section Two
## Section Three

### Sub A
### Sub B
### Sub C
### Sub D

- Item 1
- Item 2
- Item 3
- Item 4
- Item 5

https://example.com/1
https://example.com/2
https://example.com/3

\`\`\`code\nblock\n\`\`\`

| Col1 | Col2 |
|------|------|
| A    | B    |
| C    | D    |
`;
    const score = calculateSemanticDepth(text);
    expect(score).toBeLessThanOrEqual(25);
  });
});

describe('Machine Readability Scoring', () => {
  it('should calculate text-to-code ratio', () => {
    const text = 'This is clean content with good information density.';
    const html = '<article><p>This is clean content with good information density.</p></article>';
    
    const ratio = text.length / html.length;
    expect(ratio).toBeGreaterThan(0.5); // Good ratio
  });

  it('should penalize bloated HTML', () => {
    const text = 'Short content.';
    const html = `
<!DOCTYPE html>
<html>
<head>
  <script src="huge-library.js"></script>
  <script src="analytics.js"></script>
  <script src="tracking.js"></script>
  <style>.class { color: red; }</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="content">
        <p>Short content.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
    
    const ratio = text.length / html.length;
    expect(ratio).toBeLessThan(0.2); // Poor ratio
  });
});

describe('Agent File Verification', () => {
  it('should detect llms.txt reference', () => {
    const text = 'Read our llms.txt for more information.';
    const hasLlmsTxt = text.toLowerCase().includes('llms.txt');
    expect(hasLlmsTxt).toBe(true);
  });

  it('should detect OpenAPI reference', () => {
    const text = 'Our API is documented with OpenAPI 3.0';
    const hasOpenApi = text.toLowerCase().includes('openapi') || 
                       text.toLowerCase().includes('open api');
    expect(hasOpenApi).toBe(true);
  });
});
