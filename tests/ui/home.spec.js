import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/ui/HomePage';
import { createSubscriberEmail } from '../../test-data/ui/subscriptionData';

test.describe('Home page', () => {
  test('loads home page and shows signup login navigation', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.expectLoaded();
    await homePage.expectSignupLoginAvailable();
  });

  test('subscribes from the footer', async ({ page }) => {
    const homePage = new HomePage(page);
    const email = createSubscriberEmail();

    await homePage.goto();
    await homePage.subscribe(email);
    await homePage.expectSubscriptionSuccess();

    await expect(page.locator('#success-subscribe')).toBeVisible();
  });
});
