export class CartPage {
  //selectors
  cartContainer = () => cy.dataCy('cart-container');
  productCartContainer = () => cy.get('[data-cy^="cart-product-container-"]');

  //methods
}
