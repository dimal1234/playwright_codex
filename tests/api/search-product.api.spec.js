import { test, expect } from '@playwright/test';
import { AutomationExerciseApi } from '../../pages/api/AutomationExerciseApi';
import { productApiData } from '../../test-data/api/productApiData';

test.describe('Search Product API', () => {
  test('searches products with valid search term', async ({ request }) => {
    const api = new AutomationExerciseApi(request);

    const response = await api.searchProducts(productApiData.validSearchTerm);

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

  test('returns bad request when search term is missing', async ({ request }) => {
    const api = new AutomationExerciseApi(request);

    const response = await api.searchProductsWithoutTerm();

    expect(response.httpStatus).toBe(200);
    expect(response.body.responseCode).toBe(400);
    expect(response.body.message).toBe(productApiData.missingSearchTermMessage);
  });
});
