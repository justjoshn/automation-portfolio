import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';

const parsePrice = (price: string): number => {
  return parseFloat(price.replace(/[^0-9.]/g, ''));
};

describe('react shopping cart', () => {
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify that when a user adds a product to the shopping cart, it actually appears in the cart.', () => {
    productsPage.clickOnAddToCartButton(0);

    cartPage.cartContainer().should('be.visible');
    cartPage.cartProductContainer().should('be.visible').and('have.length', 1);
  });

  it('Check that the total price in the cart updates correctly when multiple items are added.', () => {
    productsPage.clickOnAddToCartButton(0);
    productsPage.clickOnAddToCartButton(1);

    cartPage
      .cartProductPrice()
      .first()
      .invoke('text')
      .then((firstCartProductPriceText) => {
        const firstCartProductPrice = parsePrice(
          firstCartProductPriceText || ''
        );

        cartPage
          .cartProductPrice()
          .eq(1)
          .invoke('text')
          .then((secondCartProductPriceText) => {
            const secondCartProductPrice = parsePrice(
              secondCartProductPriceText || ''
            );

            const sumOfProductsInCart =
              firstCartProductPrice + secondCartProductPrice;

            cartPage
              .cartTotalPrice()
              .invoke('text')
              .then((totalCartPriceText) => {
                const totalPrice = parsePrice(totalCartPriceText || '');

                expect(sumOfProductsInCart).equal(totalPrice);
              });
          });
      });
  });

  it('Confirm that changing the quantity of a product in the cart updates the total price correctly.', () => {
    productsPage.clickOnAddToCartButton(0);

    cartPage.clickOnIncreaseQuantityButton(0);

    cartPage
      .cartProductPrice()
      .first()
      .invoke('text')
      .then((firstCartProductPriceText) => {
        const firstCartProductPrice = parsePrice(
          firstCartProductPriceText || ''
        );

        cartPage
          .cartTotalPrice()
          .invoke('text')
          .then((totalCartPriceText) => {
            const totalPrice = parsePrice(totalCartPriceText || '');

            expect(totalPrice).equal(firstCartProductPrice * 2);
          });
      });
  });

  it('Ensure that a product can be removed from the shopping cart.', () => {
    productsPage.clickOnAddToCartButton(0);
    cartPage.clickOnRemoveProductFromCartButton(0);
  
    cartPage.cartProductContainer().should('not.exist');
  
    return cartPage
      .cartTotalPrice()
      .invoke('text')
      .then((totalCartPrice) => {
        const totalPrice = parsePrice(totalCartPrice || '');
  
        expect(totalPrice).equal(0);
      });
  });
  
  it('Verify that filtering products by size only shows products available in the selected size.', () => {
    productsPage.productCount().invoke('text').then((productCountTextBefore) => {
      const productCountBefore = parseInt(productCountTextBefore.match(/\d+/)[0], 10);
  
      productsPage.productContainers().its('length').then((productContainersLengthBefore) => {
        const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
  
        sizes.forEach(size => {
          productsPage.clickOnFilterButton(size);
  
          productsPage.productCount().invoke('text').then((productCountTextAfterSize) => {
            const productCountAfterSize = parseInt(productCountTextAfterSize.match(/\d+/)[0], 10);
  
            productsPage.productContainers().its('length').then((productContainersLengthAfterSize) => {
              expect(productContainersLengthBefore).not.eq(productContainersLengthAfterSize);
              expect(productCountBefore).not.eq(productCountAfterSize);
  
              productsPage.clickOnFilterButton(size);
            });
          });
        });
      });
    });
  });

  it('Check if the product page correctly displays installment information when available.', () => {
    productsPage.clickOnFilterButton('L')

    productsPage.productContainers().its('length').then((productContainersLength) => {
      for (let i = 0; i < productContainersLength; i++) {
        productsPage.productPrices().eq(i).invoke('text').then((productPriceText) => {
          const productPrice = parseFloat(productPriceText.replace('$', ''));

          productsPage.productInstallmentCounts().eq(i).invoke('text').then((productInstallmentCountText) => {
            const installmentCountMatches = productInstallmentCountText.match(/\d+/);

            const installmentCount = installmentCountMatches
            ? parseInt(installmentCountMatches[0], 10)
            : 0;

            productsPage.productInstallmentPrices().eq(i).invoke('text').then((productInstallmentPriceText) => {
              const installmentPriceMatches =
              productInstallmentPriceText.match(/\$?(\d+(\.\d{2})?)/);
      
              const installmentPrice = installmentPriceMatches
                ? parseFloat(installmentPriceMatches[1])
                : 0;
        
              const totalInstallmentPrice = installmentPrice * installmentCount;
              expect(totalInstallmentPrice).closeTo(productPrice, 0.05);
            })
          })
        })
      }
    })
  });
});
