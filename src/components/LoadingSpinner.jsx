import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
      }}
    >
      <CircularProgress sx={{ color: 'secondary', size: '3rem' }} />
    </Box>
  );
};

export default LoadingSpinner;
