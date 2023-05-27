import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { memo } from 'react';
import CategorySelect from './Inputs/CategorySelect';
import PriceInput from './Inputs/PriceInput';
import RatingFilter from './Inputs/RatingFilter';

const Filters = memo(
  ({
    categories,
    minPrice,
    maxPrice,
    category,
    ratingFilter,
    handleChange,
  }) => {
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
  categories: PropTypes.array,
  minPrice: PropTypes.string,
  maxPrice: PropTypes.string,
  category: PropTypes.string,
  ratingFilter: PropTypes.bool,
  handleChange: PropTypes.func,
};

Filters.displayName = 'Filters';

export default Filters;
