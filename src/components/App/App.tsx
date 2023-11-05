import { useEffect } from 'react';

import Loader from 'components/Loader';
import { GithubCorner, GithubStarButton } from 'components/Github';
import Recruiter from 'components/Recruiter';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';

import { useProducts } from 'contexts/products-context';

import * as S from './style';

function App() {
  const { isFetching, products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <S.Container data-cy="app-container">
      {isFetching && <Loader data-cy="loader" />}
      <GithubCorner data-cy="github-corner" />
      <Recruiter data-cy="recruiter" />
      <S.TwoColumnGrid data-cy="two-column-grid">
        <S.Side data-cy="side-bar">
          <Filter data-cy="filter" />
          <GithubStarButton data-cy="github-star-button" />
        </S.Side>
        <S.Main data-cy="main-content">
          <S.MainHeader data-cy="main-header">
            <p data-cy="product-count">{products?.length} Product(s) found</p>
          </S.MainHeader>
          <Products products={products} data-cy="products" />
        </S.Main>
      </S.TwoColumnGrid>
      <Cart data-cy="cart" />
    </S.Container>
  );
}

export default App;
