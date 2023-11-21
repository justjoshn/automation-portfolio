export class CartPage {
  //selectors
  cartContainer = () => cy.dataCy('cart-container');
  cartProductContainer = () => cy.get('[data-cy^="cart-product-container-"]');
  cartProductPrice = () => cy.get('[data-cy^="cart-product-price-"]');
  cartTotalPrice = () => cy.dataCy('cart-subtotal-value');
  increaseQuantityButton = () => cy.get('[data-cy^="cart-increase-quantity-"]');
  removeProductFromCartButton = () =>
    cy.get('[data-cy^="cart-remove-product-"]');

  //methods
  clickOnIncreaseQuantityButton(index: number) {
    this.increaseQuantityButton().eq(index).click();
  }

  clickOnRemoveProductFromCartButton(index: number) {
    this.removeProductFromCartButton().eq(index).click();
  }
}
