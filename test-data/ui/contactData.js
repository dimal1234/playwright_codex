export function createContactMessageData(timestamp = Date.now()) {
  return {
    name: 'Automation Tester',
    email: `contact-${timestamp}@example.com`,
    subject: 'Playwright framework check',
    message: 'This is a test message from the Playwright automation framework.',
  };
}
