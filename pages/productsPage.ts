import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productAddToCartButton: Locator;
  readonly productCount: Locator;
  readonly productContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productAddToCartButton = page.locator('[data-cy^="add-to-cart-"]');
    this.productCount = page.getByTestId('product-count');
    this.productContainer = page.locator('[data-cy^="product-container-"]')
  }

  async clickOnProductAddToCartButton(productIndex: number) {
    await this.productAddToCartButton.nth(productIndex).click();
  }

  async getProductCount() {
    const text = await this.productCount.textContent();
    if (text === null) {
      throw new Error('Unable to find product count text.');
    }
    const match = text.match(/\d+/);
    
    if (match !== null) {
      return parseInt(match[0], 10);
    } else {
      throw new Error('Product count text does not contain any digits.');
    }
  }

  async applyFilterByLabel(labelText: string) {
    const label = this.page.locator(`label:has(span:text-is("${labelText}"))`);
  
    await label.click();
  }
  
  

  async getActualProductCount() {
    return this.productContainer.count();
  }
}
