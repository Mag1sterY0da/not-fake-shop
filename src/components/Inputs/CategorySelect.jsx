import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

const CategorySelect = memo(({ category, handleChange, categories }) => {
  return (
    <Grid item xs={12} sm={3}>
      <FormControl fullWidth>
        <InputLabel id='category-select-label'>Category</InputLabel>
        <Select
          labelId='category-select-label'
          id='category-select'
          label='Category'
          onChange={handleChange}
          value={category}
          fullWidth
        >
          <MenuItem value='all'>All Products</MenuItem>
          {categories.map((category, i) => (
            <MenuItem key={i} value={category}>
              {category[0].toUpperCase() + category.slice(1).toLowerCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
});

CategorySelect.propTypes = {
  category: PropTypes.string,
  handleChange: PropTypes.func,
  categories: PropTypes.array,
};

CategorySelect.displayName = 'CategorySelect';

export default CategorySelect;
