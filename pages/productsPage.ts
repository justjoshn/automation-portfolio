import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productAddToCartButton: Locator;
  readonly cartContainer: Locator;
  readonly productCartContainer: Locator;
  readonly cartProductPriceText: Locator;
  readonly cartTotalPriceText: Locator;
  readonly increaseQuantityButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productAddToCartButton = page.locator('[data-cy^="add-to-cart-"]');
    this.cartContainer = page.getByTestId('cart-container');

    this.productCartContainer = page.locator(
      '[data-cy^="cart-product-container-"]'
    );

    this.cartProductPriceText = page.locator(
      '[data-cy="cart-content"] >> [data-cy^="product-price-"] >> p'
    );

    this.cartTotalPriceText = page.getByTestId('subtotal-value');

    this.increaseQuantityButton = page.getByTestId(
      'increase-quantity-8552515751438644'
    );
  }

  async clickOnProductAddToCartButton(productIndex: number) {
    await this.productAddToCartButton.nth(productIndex).click();
  }

  async clickOnIncreaseQuantityButton() {
    await this.increaseQuantityButton.click();
  }
}
