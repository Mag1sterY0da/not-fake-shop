import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useCategoriesQuery } from '../hooks/data/useCategoriesQuery';
import CategorySelect from './Inputs/CategorySelect';
import PriceInput from './Inputs/PriceInput';
import RatingFilter from './Inputs/RatingFilter';

const Filters = memo(
  ({ minPrice, maxPrice, category, ratingFilter, handleChange }) => {
    const { data: categories, isLoading: isCategoriesLoading } =
      useCategoriesQuery();

    if (!categories || isCategoriesLoading) return null;

    return (
      <Grid container spacing={3} alignItems='center' sx={{ mt: '1.2rem' }}>
        <PriceInput
          label='Min Price'
          placeholder='Min price'
          value={minPrice}
          handleChange={handleChange('minPrice')}
        />
        <PriceInput
          label='Max Price'
          placeholder='Max Price'
          value={maxPrice}
          handleChange={handleChange('maxPrice')}
        />
        <CategorySelect
          category={category}
          handleChange={handleChange('category')}
          categories={categories}
        />
        <RatingFilter
          ratingFilter={ratingFilter}
          handleChange={handleChange('ratingFilter')}
        />
      </Grid>
    );
  }
);

Filters.propTypes = {
  minPrice: PropTypes.string,
  maxPrice: PropTypes.string,
  category: PropTypes.string,
  ratingFilter: PropTypes.bool,
  handleChange: PropTypes.func,
};

Filters.displayName = 'Filters';

export default Filters;
