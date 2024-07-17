import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartContainer: Locator;
  readonly productCartContainer: Locator;
  readonly cartProductPriceText: Locator;
  readonly cartTotalPriceText: Locator;
  readonly increaseQuantityButton: Locator;
  readonly removeProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartContainer = page.getByTestId('cart-container');

    this.productCartContainer = page.locator(
      '[data-cy^="cart-product-container-"]'
    );

    this.cartProductPriceText = page.locator(
      '[data-cy^="cart-product-price-"]'
    );

    this.cartTotalPriceText = page.getByTestId('cart-subtotal-value');

    this.increaseQuantityButton = page.locator(
      '[data-cy^="cart-increase-quantity-"]'
    );

    this.removeProductButton = page.locator(
      '[data-cy^="cart-remove-product-"]'
    );
  }
}
