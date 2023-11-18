import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import { useCart } from 'contexts/cart-context';

import * as S from './style';

const Cart = () => {
  const { products, total, isOpen, openCart, closeCart } = useCart();

  const handleCheckout = () => {
    if (total.productQuantity) {
      alert(
        `Checkout - Subtotal: ${total.currencyFormat} ${formatPrice(
          total.totalPrice,
          total.currencyId
        )}`
      );
    } else {
      alert('Add some product in the cart!');
    }
  };

  const handleToggleCart = (isOpen: boolean) => () =>
    isOpen ? closeCart() : openCart();

  return (
    <S.Container isOpen={isOpen} data-cy="cart-container">
      <S.CartButton
        onClick={handleToggleCart(isOpen)}
        data-cy="cart-toggle-button"
      >
        {isOpen ? (
          <span data-cy="close-cart">X</span>
        ) : (
          <S.CartIcon data-cy="cart-icon">
            <S.CartQuantity
              title="Products in cart quantity"
              data-cy="cart-quantity"
            >
              {total.productQuantity}
            </S.CartQuantity>
          </S.CartIcon>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent data-cy="cart-content">
          <S.CartContentHeader data-cy="cart-content-header">
            <S.CartIcon large data-cy="cart-icon-large">
              <S.CartQuantity data-cy="cart-quantity-header">
                {total.productQuantity}
              </S.CartQuantity>
            </S.CartIcon>
            <S.HeaderTitle data-cy="cart-header-title">Cart</S.HeaderTitle>
          </S.CartContentHeader>

          <CartProducts products={products} data-cy="cart-products" />

          <S.CartFooter data-cy="cart-footer">
            <S.Sub data-cy="subtotal-label">SUBTOTAL</S.Sub>
            <S.SubPrice data-cy="subtotal-price">
              <S.SubPriceValue data-cy="subtotal-value">{`${
                total.currencyFormat
              } ${formatPrice(
                total.totalPrice,
                total.currencyId
              )}`}</S.SubPriceValue>
              <S.SubPriceInstallment data-cy="subtotal-installment">
                {total.installments ? (
                  <span data-cy="installment-value">
                    {`OR UP TO ${total.installments} x ${
                      total.currencyFormat
                    } ${formatPrice(
                      total.totalPrice / total.installments,
                      total.currencyId
                    )}`}
                  </span>
                ) : null}
              </S.SubPriceInstallment>
            </S.SubPrice>
            <S.CheckoutButton
              onClick={handleCheckout}
              autoFocus
              data-cy="checkout-button"
            >
              Checkout
            </S.CheckoutButton>
          </S.CartFooter>
        </S.CartContent>
      )}
    </S.Container>
  );
};

export default Cart;
