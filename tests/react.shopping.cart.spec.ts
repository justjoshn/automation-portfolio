import { test, expect, type Page } from '@playwright/test';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { parsePrice } from '../support/utils';

test.describe('react shopping cart', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await page.goto('/');
  });

  test('Verify that when a user adds a product to the shopping cart, it actually appears in the cart.', async () => {
    await productsPage.clickOnProductAddToCartButton(0);

    await expect(cartPage.cartContainer).toBeVisible();
    await expect(cartPage.productCartContainer).toBeVisible();
  });

  test('Check that the total price in the cart updates correctly when multiple items are added.', async () => {
    await productsPage.clickOnProductAddToCartButton(0);
    await productsPage.clickOnProductAddToCartButton(1);

    const firstCartProductPriceText = await cartPage.cartProductPriceText
      .nth(0)
      .textContent();

    const secondCartProductPriceText = await cartPage.cartProductPriceText
      .nth(1)
      .textContent();

    const firstCartProductPrice = parsePrice(firstCartProductPriceText || '');
    const secondCartProductPrice = parsePrice(secondCartProductPriceText || '');
    const sumOfProductsInCart = firstCartProductPrice + secondCartProductPrice;
    const totalCartPriceText = await cartPage.cartTotalPriceText.textContent();
    const totalPrice = parsePrice(totalCartPriceText || '');

    expect(sumOfProductsInCart).toBe(totalPrice);
  });

  test('Confirm that changing the quantity of a product in the cart updates the total price correctly.', async () => {
    await productsPage.clickOnProductAddToCartButton(0);
    await cartPage.clickOnIncreaseQuantityButton(0);

    const firstCartProductPriceText = await cartPage.cartProductPriceText
      .nth(0)
      .textContent();

    const firstCartProductPrice = parsePrice(firstCartProductPriceText || '');
    const totalCartPriceText = await cartPage.cartTotalPriceText.textContent();
    const totalPrice = parsePrice(totalCartPriceText || '');

    expect(totalPrice).toBe(firstCartProductPrice * 2);
  });

  test('Ensure that a product can be removed from the shopping cart.', async () => {
    await productsPage.clickOnProductAddToCartButton(0);
    await cartPage.clickOnRemoveProductButton(0);

    await expect(cartPage.productCartContainer).not.toBeVisible();

    const totalCartPriceText = await cartPage.cartTotalPriceText.textContent();
    const totalPrice = parsePrice(totalCartPriceText || '');

    expect(totalPrice).toBe(0);
  });

  test('Verify that filtering products by size only shows products available in the selected size.', async () => {
    const textCountBefore = await productsPage.getProductCount();
    const displayCountBefore = await productsPage.getActualProductCount();
  
    const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
  
    for (const size of sizes) {
      await productsPage.applyFilterByLabel(size);
  
      const textCountAfter = await productsPage.getProductCount();
      const displayCountAfter = await productsPage.getActualProductCount();
  
      expect(textCountBefore).not.toBe(textCountAfter);
      expect(displayCountBefore).not.toBe(displayCountAfter);
  
      if (size !== 'XXL') {
        await productsPage.applyFilterByLabel(size);
      }
    }
  
    await productsPage.applyFilterByLabel('XXL');
  });
  

  test('Check if the product page correctly displays installment information when available.', async () => {
    await productsPage.applyFilterByLabel('L');

    const productCount = await productsPage.getProductCount();

    for (let i = 0; i < productCount; i++) {
      const productPriceText =
        (await productsPage.productPrices.nth(i).textContent()) ?? '';

      const productPrice = parseFloat(productPriceText.replace('$', ''));

      const installmentCountText =
        (await productsPage.productInstallmentCounts.nth(i).textContent()) ??
        '';

      const installmentCountMatches = installmentCountText.match(/\d+/);

      const installmentCount = installmentCountMatches
        ? parseInt(installmentCountMatches[0], 10)
        : 0;

      const installmentPriceText =
        (await productsPage.productInstallmentPrices.nth(i).textContent()) ??
        '';

      const installmentPriceMatches =
        installmentPriceText.match(/\$?(\d+(\.\d{2})?)/);

      const installmentPrice = installmentPriceMatches
        ? parseFloat(installmentPriceMatches[1])
        : 0;

      const totalInstallmentPrice = installmentPrice * installmentCount;
      expect(totalInstallmentPrice).toBeCloseTo(productPrice, 1);
    }
  });
});
