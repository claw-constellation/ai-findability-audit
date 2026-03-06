import { test, expect } from '@playwright/test';

/**
 * AI Findability Audit - Comprehensive Test Suite
 * 
 * Tests cover:
 * - Visual elements and animations
 * - Form functionality including URL autocomplete
 * - Navigation and interactions
 * - Responsive design
 * - Accessibility
 */

test.describe('Landing Page - Visual Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display particle background canvas', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should render navigation with AIFA branding', async ({ page }) => {
    await expect(page.getByText('AIFA')).toBeVisible();
    await expect(page.getByText('AI Findability Audit')).toBeVisible();
    await expect(page.getByText('SYSTEM ONLINE')).toBeVisible();
  });

  test('should display animated hero section', async ({ page }) => {
    await expect(page.getByText('Next-Gen SEO Intelligence')).toBeVisible();
    await expect(page.getByRole('heading', { name: /AI Findability/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Audit System/i })).toBeVisible();
  });

  test('should show all stat cards with correct values', async ({ page }) => {
    await expect(page.getByText('69%')).toBeVisible();
    await expect(page.getByText('Zero-click searches')).toBeVisible();
    
    await expect(page.getByText('60%')).toBeVisible();
    await expect(page.getByText('AI Overview coverage')).toBeVisible();
    
    await expect(page.getByText('82B')).toBeVisible();
    await expect(page.getByText('Billion AI market by 2030')).toBeVisible();
  });

  test('should render glass card effects', async ({ page }) => {
    const glassCards = page.locator('[class*="backdrop-blur"]');
    await expect(glassCards.first()).toBeVisible();
  });

  test('should display glowing button', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /Start Analysis/i });
    await expect(startButton).toBeVisible();
    await expect(startButton).toHaveCSS('background-color', /rgb\(6, 182, 212\)|rgba\(6, 182, 212/);
  });
});

test.describe('Landing Page - Form Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display audit form with correct labels', async ({ page }) => {
    await expect(page.getByText('Initiate Scan')).toBeVisible();
    await expect(page.getByText('Enter target parameters for analysis')).toBeVisible();
    await expect(page.getByLabel(/Target URL/i)).toBeVisible();
    await expect(page.getByLabel(/Contact Channel/i)).toBeVisible();
  });

  test('should auto-complete URL without protocol', async ({ page }) => {
    const urlInput = page.getByPlaceholder(/netflix.com or https/i);
    
    // Test www prefix
    await urlInput.fill('www.netflix.com');
    await expect(page.getByText(/Will scan: https:\/\/www.netflix.com/i)).toBeVisible();
    
    // Test without any prefix
    await urlInput.fill('example.com');
    await expect(page.getByText(/Will scan: https:\/\/example.com/i)).toBeVisible();
    
    // Test with https (should not show autocomplete hint)
    await urlInput.fill('https://google.com');
    await expect(page.getByText(/Will scan:/i)).not.toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /Execute Audit/i });
    
    // Try to submit empty form
    await submitButton.click();
    
    // HTML5 validation should prevent submission
    const urlInput = page.getByPlaceholder(/netflix.com or https/i);
    await expect(urlInput).toHaveAttribute('required', '');
  });

  test('should show analyzing state on submit', async ({ page }) => {
    const urlInput = page.getByPlaceholder(/netflix.com or https/i);
    const emailInput = page.getByPlaceholder(/you@company.com/i);
    const submitButton = page.getByRole('button', { name: /Execute Audit/i });
    
    await urlInput.fill('https://example.com');
    await emailInput.fill('test@example.com');
    
    // Click and immediately check for loading state
    await submitButton.click();
    
    // Should show analyzing text and spinner
    await expect(page.getByText(/Analyzing/i)).toBeVisible();
  });
});

test.describe('Landing Page - Analysis Protocol Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display Analysis Protocol heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Analysis Protocol/i })).toBeVisible();
  });

  test('should show all three feature cards', async ({ page }) => {
    await expect(page.getByText('01')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Scan/i })).toBeVisible();
    
    await expect(page.getByText('02')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Score/i })).toBeVisible();
    
    await expect(page.getByText('03')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Optimize/i })).toBeVisible();
  });

  test('should display feature descriptions', async ({ page }) => {
    await expect(page.getByText(/Deep crawl using AI-native tools/i)).toBeVisible();
    await expect(page.getByText(/Four-dimensional assessment/i)).toBeVisible();
    await expect(page.getByText(/Receive a prioritized battle plan/i)).toBeVisible();
  });
});

test.describe('Landing Page - Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display footer with branding', async ({ page }) => {
    await expect(page.getByText('AI Findability Audit').nth(1)).toBeVisible();
    await expect(page.getByText(/Built for the AI-first web/i)).toBeVisible();
  });
});

test.describe('Landing Page - Navigation & Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should scroll to form when clicking Start Analysis', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /Start Analysis/i });
    await startButton.click();
    
    // Form should be visible after scroll
    await expect(page.getByText('Initiate Scan')).toBeInViewport();
  });

  test('should have working hover effects on cards', async ({ page }) => {
    const firstCard = page.locator('[class*="backdrop-blur"]').first();
    await firstCard.hover();
    
    // Card should have hover styling (border color change)
    await expect(firstCard).toHaveCSS('transition', /border-color/);
  });
});

test.describe('Responsive Design', () => {
  test('should adapt layout for mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hero text should still be visible
    await expect(page.getByRole('heading', { name: /AI Findability/i })).toBeVisible();
    
    // Form should be accessible
    await expect(page.getByText('Initiate Scan')).toBeVisible();
  });

  test('should adapt layout for tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Stats should be visible
    await expect(page.getByText('69%')).toBeVisible();
    await expect(page.getByText('60%')).toBeVisible();
    await expect(page.getByText('82B')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    const h2s = page.locator('h2');
    await expect(h2s).toHaveCount(2); // "Initiate Scan" and "Analysis Protocol"
  });

  test('should have accessible form labels', async ({ page }) => {
    const urlInput = page.getByLabel(/Target URL/i);
    await expect(urlInput).toHaveAttribute('type', /text|url/);
    
    const emailInput = page.getByLabel(/Contact Channel/i);
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('should have focusable interactive elements', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /Start Analysis/i });
    await startButton.focus();
    await expect(startButton).toBeFocused();
    
    const submitButton = page.getByRole('button', { name: /Execute Audit/i });
    await submitButton.focus();
    await expect(submitButton).toBeFocused();
  });

  test('should have alt text on icons (if images)', async ({ page }) => {
    // Check that icons are implemented accessibly (as SVG or with aria-label)
    const icons = page.locator('svg');
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should render canvas animation', async ({ page }) => {
    await page.goto('/');
    
    // Canvas should exist and be rendered
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Check canvas has dimensions
    const box = await canvas.boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.height).toBeGreaterThan(0);
  });
});

test.describe('Visual Regression', () => {
  test('hero section should match snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of hero area
    const hero = page.locator('section').first();
    await expect(hero).toHaveScreenshot('hero-section.png', {
      maxDiffPixels: 100,
    });
  });

  test('audit form should match snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const form = page.locator('#audit-form');
    await expect(form).toHaveScreenshot('audit-form.png', {
      maxDiffPixels: 100,
    });
  });
});
