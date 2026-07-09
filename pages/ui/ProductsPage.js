import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /all products/i });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByRole('heading', { name: /searched products/i });
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.productNames = page.locator('.features_items .productinfo p');
    this.viewCartLink = page.getByRole('link', { name: /view cart/i });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/products/);
    await expect(this.heading).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }

  async searchFor(term) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async expectSearchResultsFor(term) {
    await expect(this.searchedProductsHeading).toBeVisible();
    await expect(this.productNames.first()).toContainText(new RegExp(term, 'i'));
  }

  async addFirstProductToCart() {
    await this.productCards.first().scrollIntoViewIfNeeded();
    await this.productCards.first().hover();
    await this.productCards.first().locator('.add-to-cart').first().click();
  }

  async expectProductAddedModal() {
    await expect(this.page.locator('.modal-content')).toContainText('Added!');
    await expect(this.viewCartLink).toBeVisible();
  }
}
