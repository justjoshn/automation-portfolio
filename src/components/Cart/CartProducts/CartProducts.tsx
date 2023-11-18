import { ICartProduct } from 'models';
import CartProduct from './CartProduct';

import * as S from './style';

interface IProps {
  products: ICartProduct[];
}

const CartProducts = ({ products }: IProps) => {
  return (
    <S.Container data-cy="cart-products-container">
      {products?.length ? (
        products.map((p) => (
          <CartProduct
            product={p}
            key={p.sku}
            data-cy={`cart-product-item-${p.sku}`}
          />
        ))
      ) : (
        <S.CartProductsEmpty data-cy="cart-empty-message">
          Add some products in the cart <br />
          :)
        </S.CartProductsEmpty>
      )}
    </S.Container>
  );
};

export default CartProducts;
