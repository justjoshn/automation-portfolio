import formatPrice from 'utils/formatPrice';
import { ICartProduct } from 'models';

import { useCart } from 'contexts/cart-context';

import * as S from './style';

interface IProps {
  product: ICartProduct;
}

const CartProduct = ({ product }: IProps) => {
  const { removeProduct, increaseProductQuantity, decreaseProductQuantity } =
    useCart();
  const {
    sku,
    title,
    price,
    style,
    currencyId,
    currencyFormat,
    availableSizes,
    quantity,
  } = product;

  const handleRemoveProduct = () => removeProduct(product);
  const handleIncreaseProductQuantity = () => increaseProductQuantity(product);
  const handleDecreaseProductQuantity = () => decreaseProductQuantity(product);

  return (
    <S.Container data-cy={`cart-product-container-${sku}`}>
      <S.DeleteButton
        onClick={handleRemoveProduct}
        title="remove product from cart"
        data-cy={`cart-remove-product-${sku}`}
      />
      <S.Image
        src={require(`static/products/${sku}-1-cart.webp`)}
        alt={title}
        data-cy={`cart-product-image-${sku}`}
      />
      <S.Details data-cy={`cart-product-details-${sku}`}>
        <S.Title>{title}</S.Title>
        <S.Desc>
          {`${availableSizes[0]} | ${style}`} <br />
          Quantity: {quantity}
        </S.Desc>
      </S.Details>
      <S.Price>
        <p
          data-cy={`cart-product-price-${sku}`}
        >{`${currencyFormat}  ${formatPrice(price, currencyId)}`}</p>
        <div>
          <S.ChangeQuantity
            onClick={handleDecreaseProductQuantity}
            disabled={quantity === 1}
            data-cy={`cart-decrease-quantity-${sku}`}
          >
            -
          </S.ChangeQuantity>
          <S.ChangeQuantity
            onClick={handleIncreaseProductQuantity}
            data-cy={`cart-increase-quantity-${sku}`}
          >
            +
          </S.ChangeQuantity>
        </div>
      </S.Price>
    </S.Container>
  );
};

export default CartProduct;
