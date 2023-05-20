import {
  ArrowBackIos,
  SentimentVeryDissatisfied,
  ShoppingCartCheckout,
} from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { usePageTitle } from '../hooks/usePageTitle';
import { useWishList } from '../hooks/useWishList';

const useStyles = () => ({
  media: {
    height: '9.6rem',
    m: 2,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
});

const WishPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  usePageTitle();

  const navigate = useNavigate();

  const { isInCart, addToCart } = useCart();
  const { wishProducts, toggleWish } = useWishList();

  return (
    <Container maxWidth='md'>
      <Typography
        variant='h3'
        sx={{
          textAlign: 'center',
          pt: '1.2rem',
          mb: '3.2rem',
          fontWeight: 700,
        }}
      >
        Your Wishlist
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.4rem',
          mb: '2.4rem',
        }}
      >
        {wishProducts.length > 0 ? (
          wishProducts.map((prod, i) => (
            <Box key={i}>
              <Card
                sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
              >
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
                    <Box sx={{ mb: '1.2rem' }}>
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
                    </Box>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={
                          isInCart(prod._id) ? (
                            <ShoppingCartCheckout />
                          ) : (
                            <AddShoppingCartIcon />
                          )
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          isInCart(prod._id)
                            ? navigate('/cart')
                            : addToCart(prod._id);
                        }}
                      >
                        {isInCart(prod._id) ? 'View in Cart' : 'Add to cart'}
                      </Button>
                      <Button
                        variant='outlined'
                        color='primary'
                        startIcon={<FavoriteBorderIcon />}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWish(prod._id);
                        }}
                      >
                        Remove from Wishlist
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.2rem',
            }}
          >
            <Typography variant='h6' sx={{ textAlign: 'center' }}>
              Your wishlist is empty
            </Typography>
            <SentimentVeryDissatisfied fontSize='large' />
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '2.4rem' }}>
        <IconButton onClick={() => navigate('/')} sx={{ mt: 2 }}>
          <ArrowBackIos /> Continue Shopping
        </IconButton>
      </Box>
    </Container>
  );
};

export default WishPage;
