export function createCustomerData(timestamp = Date.now()) {
  return {
    name: `Automation Customer ${timestamp}`,
    email: `automation-customer-${timestamp}@example.com`,
    password: 'Password123!',
    birthDay: '10',
    birthMonth: '5',
    birthYear: '1990',
    firstName: 'Automation',
    lastName: 'Customer',
    company: 'QA Practice Ltd',
    address: '123 Test Street',
    address2: 'Suite 5',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    zipcode: '94105',
    mobileNumber: '5551234567',
  };
}
