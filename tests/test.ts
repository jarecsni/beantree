import { expect, test } from '@playwright/test';
import { PlaywrightDevPage } from './playwright-dev-page';

test('index page has expected h1', async ({ page }) => {
	const playwrightDev = new PlaywrightDevPage(page);
  	await playwrightDev.goto();
  	await playwrightDev.getStarted();
	expect(await page.textContent('a')).toBe('Welcome to SvelteKit');
});
