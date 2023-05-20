import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const SuccessOrderPage = () => {
  usePageTitle();
  const navigate = useNavigate();

  return (
    <Box>
      <Paper sx={{ margin: '1.5rem', padding: '1.5rem' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: '4rem', color: 'primary' }} />
        </Box>
        <Typography
          variant='h4'
          sx={{ marginBottom: '1.5rem', textAlign: 'center' }}
        >
          Thank you for your order!
        </Typography>
        <Typography variant='subtitle1'>
          Your order has been successfully placed and is currently being
          processed. You will receive an email confirmation shortly.
        </Typography>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={() => navigate('/')} sx={{ mt: 2 }}>
          <ArrowBackIos /> Continue Shopping
        </IconButton>
      </Box>
    </Box>
  );
};

export default SuccessOrderPage;
