import { test, expect } from '@playwright/test';
import { AutomationExerciseApi } from '../../pages/api/AutomationExerciseApi';

test.describe('Products API', () => {
  test('gets all products list', async ({ request }) => {
    const api = new AutomationExerciseApi(request);

    const response = await api.getProducts();

    expect(response.httpStatus).toBe(200);
    expect(response.body.responseCode).toBe(200);
    expect(response.body.products.length).toBeGreaterThan(0);
    expect(response.body.products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(String),
      }),
    );
  });
});
