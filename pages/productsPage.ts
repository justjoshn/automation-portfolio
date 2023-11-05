import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page
    readonly productAddToCartButton: Locator
    readonly cartContainer: Locator
    readonly productCartContainer: Locator
    readonly cartProductPrice: Locator
    readonly cartTotalPrice: Locator

    constructor(page: Page) {
        this.page = page
        this.productAddToCartButton = page.locator('[data-cy^="add-to-cart-"]')
        this.cartContainer = page.getByTestId('cart-container')
        this.productCartContainer = page.locator('[data-cy^="cart-product-container-"]')
        this.cartProductPrice = page.locator('[data-cy="cart-content"] >> [data-cy^="product-price-"] >> p')
        this.cartTotalPrice = page.getByTestId('subtotal-value')
    }

    async clickOnProductAddToCartButton(productIndex: number) {
        await this.productAddToCartButton.nth(productIndex).click()
    }
}