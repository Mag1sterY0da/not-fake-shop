import { ArrowBackIos, SentimentSatisfiedAlt } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';
import { usePageTitle } from '../hooks/usePageTitle';

const useStyles = () => ({
  media: {
    height: '9.6rem',
    m: 2,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
});

const CheckoutPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  usePageTitle();

  const navigate = useNavigate();

  const { cartProducts } = useCart();

  if (cartProducts.length === 0) {
    return (
      <Container maxWidth='md'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            mt: '1.2rem',
            mb: '1.6rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.2rem',
              mt: '2.4rem',
            }}
          >
            <Typography variant='h6' sx={{ textAlign: 'center' }}>
              Buy something before you checkout
            </Typography>
            <SentimentSatisfiedAlt fontSize='large' />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: '2.4rem' }}>
            <IconButton onClick={() => navigate('/')} sx={{ mt: 2 }}>
              <ArrowBackIos /> Start Shopping
            </IconButton>
          </Box>
        </Box>
      </Container>
    );
  }

  const totalPrice = cartProducts
    .reduce((acc, prod) => {
      return acc + prod.price * prod.quantity;
    }, 0)
    .toFixed(2);

  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          mt: '1.2rem',
          mb: '1.6rem',
        }}
      >
        {cartProducts.map((prod, i) => (
          <Box key={i}>
            <Card sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Box sx={{ flex: 1 }}>
                <CardMedia
                  sx={styles.media}
                  image={prod.image}
                  alt={prod.title}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  flex: 3,
                }}
              >
                <CardContent>
                  <Link
                    to={`/products/${prod._id}`}
                    style={theme.links.primary}
                  >
                    <Typography gutterBottom variant='h5' component='h2'>
                      {prod.title}
                    </Typography>
                  </Link>
                  <Box>
                    <Typography
                      variant='h6'
                      component='p'
                      sx={{
                        fontSize: '1.3rem',
                        fontWeight: 300,
                        color: 'primary.main',
                        display: 'inline-block',
                        mr: 0.5,
                      }}
                    >
                      $
                    </Typography>
                    <Typography
                      variant='h6'
                      component='p'
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        display: 'inline-block',
                      }}
                    >
                      {prod.price}
                    </Typography>
                    <Typography
                      variant='h6'
                      component='p'
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        display: 'inline-block',
                        mx: '0.4rem',
                      }}
                    >
                      x
                    </Typography>
                    <Typography
                      variant='h6'
                      component='p'
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        display: 'inline-block',
                        color: 'primary.main',
                      }}
                    >
                      {prod.quantity} {prod.quantity > 1 ? 'items' : 'item'}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Box>
        ))}
        <Box sx={{ mb: '1.2rem' }}>
          <Typography variant='h5' component='p' sx={{ textAlign: 'center' }}>
            Total Price: ${totalPrice}
          </Typography>
        </Box>
      </Box>
      <CheckoutForm />
    </Container>
  );
};

export default CheckoutPage;
