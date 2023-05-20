import { Checkbox, FormControl, FormControlLabel, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

const RatingFilter = memo(({ ratingFilter, handleChange }) => {
  return (
    <Grid item xs={12} sm={3}>
      <FormControl fullWidth>
        <FormControlLabel
          control={<Checkbox checked={ratingFilter} onChange={handleChange} />}
          label='4+ Stars'
        />
      </FormControl>
    </Grid>
  );
});

RatingFilter.propTypes = {
  ratingFilter: PropTypes.bool,
  handleChange: PropTypes.func,
};

RatingFilter.displayName = 'RatingFilter';

export default RatingFilter;
