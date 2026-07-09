import { test } from '@playwright/test';
import { HomePage } from '../../pages/ui/HomePage';
import { ProductsPage } from '../../pages/ui/ProductsPage';
import { productSearchData } from '../../test-data/ui/productData';

test.describe('Products page', () => {
  test('searches for products by keyword', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.goto();
    await homePage.openProducts();
    await productsPage.expectLoaded();
    await productsPage.searchFor(productSearchData.validSearchTerm);
    await productsPage.expectSearchResultsFor(productSearchData.validSearchTerm);
  });

  test('adds first listed product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.goto();
    await homePage.openProducts();
    await productsPage.expectLoaded();
    await productsPage.addFirstProductToCart();
    await productsPage.expectProductAddedModal();
  });
});
