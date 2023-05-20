import { AttachMoney } from '@mui/icons-material';
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

const PriceInput = memo(({ label, value, placeholder, handleChange }) => {
  return (
    <Grid item xs={12} sm={3}>
      <FormControl fullWidth>
        <TextField
          label={label}
          type='number'
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton>
                  <AttachMoney />
                </IconButton>
              </InputAdornment>
            ),
            min: 0,
          }}
          variant='outlined'
          fullWidth
        />
      </FormControl>
    </Grid>
  );
});

PriceInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

PriceInput.displayName = 'PriceInput';

export default PriceInput;
