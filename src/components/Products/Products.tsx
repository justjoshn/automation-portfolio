import { IProduct } from 'models';
import Product from './Product';

import * as S from './style';

interface IProps {
  products: IProduct[];
}

const Products = ({ products }: IProps) => {
  return (
    <S.Container data-cy="products-container">
      {products?.map((p) => (
        <Product product={p} key={p.sku} data-cy={`product-${p.sku}`} />
      ))}
    </S.Container>
  );
};

export default Products;
