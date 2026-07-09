import { test, expect } from '@playwright/test';
import { AutomationExerciseApi } from '../../pages/api/AutomationExerciseApi';

test.describe('Brands API', () => {
  test('gets all brands list', async ({ request }) => {
    const api = new AutomationExerciseApi(request);

    const response = await api.getBrands();

    expect(response.httpStatus).toBe(200);
    expect(response.body.responseCode).toBe(200);
    expect(response.body.brands.length).toBeGreaterThan(0);
    expect(response.body.brands[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        brand: expect.any(String),
      }),
    );
  });
});
