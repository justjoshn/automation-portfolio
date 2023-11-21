export class ProductsPage {
  // selectors
  addToCartButtons = () => cy.get('[data-cy^="add-to-cart-"]');

  // methods
  clickOnAddToCartButton(index: number) {
    this.addToCartButtons().eq(index).click();
  }
}
