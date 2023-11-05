import { test, expect, type Page } from '@playwright/test'
import { ProductsPage } from '../pages/productsPage'
import { parsePrice } from '../support/utils';

test.beforeEach(async({ page }) => {
    await page.goto('/')
});

test.describe('react shopping cart', () => {
    test('Verify that when a user adds a product to the shopping cart, it actually appears in the cart.', async ({ page }) => {
        const productsPage = new ProductsPage(page)

        await productsPage.clickOnProductAddToCartButton(0)

        await expect(productsPage.cartContainer).toBeVisible()
        await expect(productsPage.productCartContainer.nth(0)).toBeVisible()
    });

    test('Check that the total price in the cart updates correctly when multiple items are added.', async ( { page }) => {
        const productsPage = new ProductsPage(page)

        await productsPage.clickOnProductAddToCartButton(0)
        await productsPage.clickOnProductAddToCartButton(1)

        const firstCartProductPriceText = await productsPage.cartProductPrice.nth(0).textContent()
        const secondCartProductPriceText = await productsPage.cartProductPrice.nth(1).textContent()

        const firstCartProductPrice = parsePrice(firstCartProductPriceText || '')
        const secondCartProductPrice = parsePrice(secondCartProductPriceText || '')

        const sumOfProductsInCart = firstCartProductPrice + secondCartProductPrice

        const totalCartPriceText = await productsPage.cartTotalPrice.textContent()
        const totalPrice = parsePrice(totalCartPriceText || '')

        expect(sumOfProductsInCart).toBe(totalPrice);

        if(sumOfProductsInCart !== totalPrice) {
            console.error(`The sum of products (${sumOfProductsInCart}) does not match the cart total (${totalPrice}).`);
            expect(sumOfProductsInCart).toBe(totalPrice); // This will fail the test and log the error.
          }
    })
})