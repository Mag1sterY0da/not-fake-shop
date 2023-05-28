import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { memo } from 'react';

const Search = memo(({ search, handleChange, handleSubmit }) => {
  return (
    <Box sx={{ mt: '1.2rem' }}>
      <TextField
        fullWidth
        id='search'
        label='Search'
        variant='outlined'
        value={search}
        onChange={handleChange('search')}
        placeholder='Search any product'
        type='text'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
});

Search.propTypes = {
  search: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

Search.displayName = 'Search';

export default Search;
