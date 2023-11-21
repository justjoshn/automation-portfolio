import { KeyboardEvent } from 'react';

import formatPrice from 'utils/formatPrice';
import { IProduct } from 'models';

import { useCart } from 'contexts/cart-context';

import * as S from './style';

interface IProps {
  product: IProduct;
}

const Product = ({ product }: IProps) => {
  const { openCart, addProduct } = useCart();
  const {
    sku,
    title,
    price,
    installments,
    currencyId,
    currencyFormat,
    isFreeShipping,
  } = product;

  const formattedPrice = formatPrice(price, currencyId);
  let productInstallment;

  if (installments) {
    const installmentPrice = price / installments;

    productInstallment = (
      <S.Installment data-cy={`product-installment-${sku}`}>
        <span>or {installments} x</span>
        <b>
          {currencyFormat}
          {formatPrice(installmentPrice, currencyId)}
        </b>
      </S.Installment>
    );
  }

  const handleAddProduct = () => {
    addProduct({ ...product, quantity: 1 });
    openCart();
  };

  const handleAddProductWhenEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Space') {
      addProduct({ ...product, quantity: 1 });
      openCart();
    }
  };

  return (
    <S.Container
      onKeyUp={handleAddProductWhenEnter}
      tabIndex={1}
      data-cy={`product-container-${sku}`}
      sku={sku}
    >
      {isFreeShipping && (
        <S.Stopper data-cy={`free-shipping-${sku}`}>Free shipping</S.Stopper>
      )}
      <S.Image alt={title} data-cy={`product-image-${sku}`} />
      <S.Title data-cy={`product-title-${sku}`}>{title}</S.Title>
      <S.Price data-cy={`product-price-${sku}`}>
        <S.Val>
          <small>{currencyFormat}</small>
          <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substring(formattedPrice.length - 3)}</span>
        </S.Val>
        {productInstallment}
      </S.Price>
      <S.BuyButton
        onClick={handleAddProduct}
        tabIndex={-1}
        data-cy={`add-to-cart-${sku}`}
      >
        Add to cart
      </S.BuyButton>
    </S.Container>
  );
};

export default Product;
