import { test } from '@playwright/test';
import { ContactUsPage } from '../../pages/ui/ContactUsPage';
import { createContactMessageData } from '../../test-data/ui/contactData';

test.describe('Contact us page', () => {
  test('submits a contact message', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    await contactUsPage.goto();
    await contactUsPage.expectLoaded();
    await contactUsPage.submitMessage(createContactMessageData());
    await contactUsPage.expectSubmitted();
  });
});
