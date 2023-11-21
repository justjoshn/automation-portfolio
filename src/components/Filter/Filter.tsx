import { useProducts } from 'contexts/products-context';
import * as S from './style';

export const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

const Filter = () => {
  const { filters, filterProducts } = useProducts();

  const selectedCheckboxes = new Set(filters);

  const toggleCheckbox = (label: string) => {
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }

    const newFilters = Array.from(selectedCheckboxes);
    filterProducts(newFilters);
  };

  const createCheckbox = (label: string) => (
    <S.Checkbox
      label={label}
      handleOnChange={() => toggleCheckbox(label)}
      key={label}
      data-cy={`filter-checkbox-${label}`}
    />
  );

  const createCheckboxes = () => availableSizes.map(createCheckbox);

  return (
    <S.Container data-cy="filter-container">
      <S.Title data-cy="filter-title">Sizes:</S.Title>
      {createCheckboxes()}
    </S.Container>
  );
};

export default Filter;
