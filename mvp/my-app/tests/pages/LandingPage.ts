import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Landing Page
 * Encapsulates all selectors and actions for the AI Findability Audit landing page
 */
export class LandingPage {
  readonly page: Page;
  
  // Navigation
  readonly logo: Locator;
  readonly systemStatus: Locator;
  
  // Hero Section
  readonly heroBadge: Locator;
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly startAnalysisButton: Locator;
  
  // Stats
  readonly statCards: Locator;
  readonly zeroClickStat: Locator;
  readonly aiOverviewStat: Locator;
  readonly marketSizeStat: Locator;
  
  // Audit Form
  readonly auditForm: Locator;
  readonly urlInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly urlAutocompleteHint: Locator;
  
  // Analysis Protocol
  readonly analysisProtocolHeading: Locator;
  readonly scanCard: Locator;
  readonly scoreCard: Locator;
  readonly optimizeCard: Locator;
  
  // Footer
  readonly footer: Locator;
  
  // Background
  readonly particleCanvas: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.logo = page.getByText('AIFA');
    this.systemStatus = page.getByText('SYSTEM ONLINE');
    
    // Hero Section
    this.heroBadge = page.getByText('Next-Gen SEO Intelligence');
    this.heroTitle = page.getByRole('heading', { name: /AI Findability/i });
    this.heroSubtitle = page.getByText(/69% of searches end without a click/i);
    this.startAnalysisButton = page.getByRole('button', { name: /Start Analysis/i });
    
    // Stats
    this.statCards = page.locator('[class*="backdrop-blur"]').filter({ hasText: '%' });
    this.zeroClickStat = page.getByText('69%');
    this.aiOverviewStat = page.getByText('60%');
    this.marketSizeStat = page.getByText('82B');
    
    // Audit Form
    this.auditForm = page.locator('#audit-form');
    this.urlInput = page.getByPlaceholder(/netflix.com or https/i);
    this.emailInput = page.getByPlaceholder(/you@company.com/i);
    this.submitButton = page.getByRole('button', { name: /Execute Audit/i });
    this.urlAutocompleteHint = page.getByText(/Will scan:/i);
    
    // Analysis Protocol
    this.analysisProtocolHeading = page.getByRole('heading', { name: /Analysis Protocol/i });
    this.scanCard = page.locator('div').filter({ has: page.getByText('01') }).filter({ has: page.getByText('Scan') });
    this.scoreCard = page.locator('div').filter({ has: page.getByText('02') }).filter({ has: page.getByText('Score') });
    this.optimizeCard = page.locator('div').filter({ has: page.getByText('03') }).filter({ has: page.getByText('Optimize') });
    
    // Footer
    this.footer = page.locator('footer');
    
    // Background
    this.particleCanvas = page.locator('canvas');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async scrollToForm() {
    await this.startAnalysisButton.click();
    await expect(this.auditForm).toBeInViewport();
  }

  async fillAuditForm(url: string, email: string) {
    await this.urlInput.fill(url);
    await this.emailInput.fill(email);
  }

  async submitAuditForm() {
    await this.submitButton.click();
  }

  async expectUrlAutocompleteHint(expectedUrl: string) {
    await expect(this.urlAutocompleteHint).toContainText(expectedUrl);
  }

  async expectNoAutocompleteHint() {
    await expect(this.urlAutocompleteHint).not.toBeVisible();
  }

  async isAnalyzing() {
    return this.page.getByText(/Analyzing/i).isVisible();
  }

  async getNormalizedUrl(input: string): Promise<string> {
    // This mirrors the normalizeUrl function in the component
    let normalized = input.trim();
    if (!normalized.match(/^https?:\/\//i)) {
      normalized = `https://${normalized}`;
    }
    return normalized;
  }
}
