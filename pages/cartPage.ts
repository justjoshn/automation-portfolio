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
        this.page = page
        this.cartContainer = page.getByTestId('cart-container');

        this.productCartContainer = page.locator(
          '[data-cy^="cart-product-container-"]'
        );
    
        this.cartProductPriceText = page.locator(
          '[data-cy="cart-content"] >> [data-cy^="product-price-"] >> p'
        );
    
        this.cartTotalPriceText = page.getByTestId('subtotal-value');
    
        this.increaseQuantityButton = page.locator(
          '[data-cy^="increase-quantity-"]'
        );
    
        this.removeProductButton = page.locator('[data-cy^="remove-product-"]');
    }

    async clickOnIncreaseQuantityButton(productIndex: number) {
        await this.increaseQuantityButton.nth(productIndex).click();
      }
    
      async clickOnRemoveProductButton(productIndex: number) {
        await this.removeProductButton.nth(productIndex).click();
      }
}