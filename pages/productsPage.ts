import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productAddToCartButtons: Locator;
  readonly productCount: Locator;
  readonly productContainers: Locator;
  readonly productPrices: Locator;
  readonly productInstallmentCounts: Locator;
  readonly productInstallmentPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productAddToCartButtons = page.locator('[data-cy^="add-to-cart-"]');
    this.productCount = page.getByTestId('product-count');
    this.productContainers = page.locator('[data-cy^="product-container-"]');

    this.productPrices = page.locator('[data-cy^="product-price-value-"]');

    this.productInstallmentCounts = page.locator(
      '[data-cy^="installment-count-"]'
    );

    this.productInstallmentPrices = page.locator(
      '[data-cy^="installment-price-"]'
    );
  }

  async clickOnProductAddToCartButton(productIndex: number) {
    await this.productAddToCartButtons.nth(productIndex).click();
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
    return this.productContainers.count();
  }
}
