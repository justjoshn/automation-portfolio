export class ProductsPage {
  // selectors
  addToCartButtons = () => cy.get('[data-cy^="add-to-cart-"]');
  productCount = () => cy.dataCy('product-count')
  productContainers = () => cy.get('[data-cy^="product-container-"]')
  filterButton = (labelText: string) => cy.contains('label span', new RegExp(`^${labelText.trim()}$`))
  productInstallmentCounts = () => cy.get('[data-cy^="installment-count-"]')
  productInstallmentPrices = () => cy.get('[data-cy^="installment-price-"]')
  productPrices = () => cy.get('[data-cy^="product-price-value-"]')

  // methods
  clickOnAddToCartButton(index: number) {
    this.addToCartButtons().eq(index).click();
  }

  clickOnFilterButton(labelText: string) {
    this.filterButton(labelText).click()
  }
}
