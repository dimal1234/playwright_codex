export class AutomationExerciseApi {
  constructor(request) {
    this.request = request;
  }

  async getProducts() {
    return this.#getJson('/api/productsList');
  }

  async getBrands() {
    return this.#getJson('/api/brandsList');
  }

  async searchProducts(searchProduct) {
    return this.#getJson('/api/searchProduct', {
      method: 'POST',
      form: { search_product: searchProduct },
    });
  }

  async searchProductsWithoutTerm() {
    return this.#getJson('/api/searchProduct', {
      method: 'POST',
    });
  }

  async #getJson(url, options = {}) {
    const response = await this.request.fetch(url, options);
    const body = await response.text();

    return {
      httpStatus: response.status(),
      body: JSON.parse(body),
    };
  }
}
