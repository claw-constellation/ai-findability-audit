# AI Findability Audit - Test Suite

Comprehensive end-to-end testing using Playwright.

## Test Structure

```
tests/
├── pages/
│   └── LandingPage.ts          # Page Object Model
├── landing-page.spec.ts        # Full test suite (comprehensive)
├── critical-paths.spec.ts      # Critical user paths (faster)
└── README.md                   # This file
```

## Running Tests

### Install dependencies
```bash
npm install
npx playwright install chromium
```

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test critical-paths.spec.ts
```

### Run with UI mode (for debugging)
```bash
npx playwright test --ui
```

### Run in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run with slow motion
```bash
npx playwright test --headed --slow-mo=1000
```

## Test Coverage

### Visual Elements
- ✅ Particle background animation
- ✅ Glassmorphism cards and effects
- ✅ Glowing buttons and hover states
- ✅ Typography and color scheme
- ✅ Responsive layout

### Form Functionality
- ✅ URL autocomplete (adds https://)
- ✅ Form validation (required fields)
- ✅ Submit button states
- ✅ Loading/analyzing state

### User Interactions
- ✅ Navigation to form
- ✅ Hover effects
- ✅ Scroll behavior
- ✅ Mobile responsiveness

### Accessibility
- ✅ Heading hierarchy
- ✅ Form labels
- ✅ Focus management
- ✅ ARIA attributes

### Performance
- ✅ Page load time
- ✅ Canvas rendering

## Test Categories

### `critical-paths.spec.ts` (Fast)
- Core user journeys
- URL autocomplete
- Form submission
- ~30 seconds to run

### `landing-page.spec.ts` (Comprehensive)
- All visual elements
- Full accessibility audit
- Visual regression tests
- Responsive design checks
- ~2 minutes to run

## CI/CD

Tests run automatically on:
- Pull requests
- Pushes to main branch

See `.github/workflows/playwright.yml`

## Debugging

### View trace
```bash
npx playwright show-trace test-results/trace.zip
```

### View HTML report
```bash
npx playwright show-report
```

### Screenshot on failure
Screenshots are automatically captured in `test-results/` when tests fail.

## Writing New Tests

Use the Page Object Model pattern:

```typescript
import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test('my new test', async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  
  // Your test code here
});
```

## Best Practices

1. **Use role-based locators** (`getByRole`, `getByLabel`) for accessibility
2. **Use Page Objects** for maintainable tests
3. **Avoid hardcoded waits** — use auto-waiting
4. **Test user-visible behavior**, not implementation details
5. **Keep tests independent** — each test should stand alone
