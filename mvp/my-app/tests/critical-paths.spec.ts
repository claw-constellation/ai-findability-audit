import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

/**
 * Simplified test suite using Page Object Model
 * Tests critical user paths and functionality
 */

test.describe('Critical User Paths', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
  });

  test('user can view landing page with all key elements', async () => {
    await expect(landingPage.logo).toBeVisible();
    await expect(landingPage.systemStatus).toBeVisible();
    await expect(landingPage.heroTitle).toBeVisible();
    await expect(landingPage.startAnalysisButton).toBeVisible();
    await expect(landingPage.particleCanvas).toBeVisible();
  });

  test('user can see all statistics', async () => {
    await expect(landingPage.zeroClickStat).toBeVisible();
    await expect(landingPage.aiOverviewStat).toBeVisible();
    await expect(landingPage.marketSizeStat).toBeVisible();
  });

  test('user can navigate to audit form', async () => {
    await landingPage.scrollToForm();
    await expect(landingPage.auditForm).toBeVisible();
    await expect(landingPage.urlInput).toBeVisible();
    await expect(landingPage.emailInput).toBeVisible();
  });
});

test.describe('URL Autocomplete Feature', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.scrollToForm();
  });

  test('autocompletes www.example.com to https://www.example.com', async () => {
    await landingPage.urlInput.fill('www.example.com');
    await landingPage.expectUrlAutocompleteHint('https://www.example.com');
  });

  test('autocompletes example.com to https://example.com', async () => {
    await landingPage.urlInput.fill('example.com');
    await landingPage.expectUrlAutocompleteHint('https://example.com');
  });

  test('does not show hint for URLs with https://', async () => {
    await landingPage.urlInput.fill('https://google.com');
    await landingPage.expectNoAutocompleteHint();
  });

  test('does not show hint for URLs with http://', async () => {
    await landingPage.urlInput.fill('http://old-site.com');
    await landingPage.expectNoAutocompleteHint();
  });

  test('handles various URL formats correctly', async () => {
    const testCases = [
      { input: 'netflix.com', expected: 'https://netflix.com' },
      { input: 'www.netflix.com', expected: 'https://www.netflix.com' },
      { input: 'sub.domain.example.com', expected: 'https://sub.domain.example.com' },
    ];

    for (const { input, expected } of testCases) {
      await landingPage.urlInput.fill(input);
      await landingPage.expectUrlAutocompleteHint(expected);
    }
  });
});

test.describe('Form Submission', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.scrollToForm();
  });

  test('shows analyzing state after form submission', async () => {
    await landingPage.fillAuditForm('https://example.com', 'test@example.com');
    await landingPage.submitAuditForm();
    
    // Should show analyzing state
    await expect(landingPage.page.getByText(/Analyzing/i)).toBeVisible();
  });

  test('validates required URL field', async () => {
    // Fill only email
    await landingPage.emailInput.fill('test@example.com');
    await landingPage.submitButton.click();
    
    // Form should not submit (HTML5 validation)
    await expect(landingPage.urlInput).toHaveAttribute('required', '');
  });

  test('validates required email field', async () => {
    // Fill only URL
    await landingPage.urlInput.fill('https://example.com');
    await landingPage.submitButton.click();
    
    // Form should not submit
    await expect(landingPage.emailInput).toHaveAttribute('required', '');
  });
});

test.describe('Analysis Protocol Section', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
  });

  test('displays all three steps', async () => {
    await expect(landingPage.analysisProtocolHeading).toBeVisible();
    await expect(landingPage.scanCard).toBeVisible();
    await expect(landingPage.scoreCard).toBeVisible();
    await expect(landingPage.optimizeCard).toBeVisible();
  });
});

test.describe('Visual Design', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
  });

  test('has dark background theme', async () => {
    const body = landingPage.page.locator('body');
    const bgColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    // Should be dark (rgb(10, 10, 15) or similar)
    expect(bgColor).toMatch(/rgb\(10,\s*10,\s*15\)|#0a0a0f/);
  });

  test('has glassmorphism cards', async () => {
    const cards = landingPage.page.locator('[class*="backdrop-blur"]');
    await expect(cards.first()).toBeVisible();
    
    const hasBackdropBlur = await cards.first().evaluate(el => 
      window.getComputedStyle(el).backdropFilter.includes('blur')
    );
    expect(hasBackdropBlur).toBe(true);
  });
});
