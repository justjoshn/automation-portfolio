import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';

describe('react shopping cart', () => {
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify that when a user adds a product to the shopping cart, it actually appears in the cart.', () => {
    productsPage.clickOnAddToCartButton(0);

    cartPage.cartContainer().should('be.visible');
    cartPage.productCartContainer().should('be.visible');
  });
});
