import { ArrowBackIos, ShoppingCartCheckout } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Box,
  Button,
  CardActions,
  Chip,
  Container,
  Rating,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProductQuery } from '../hooks/data/useProductQuery';
import { useCart } from '../hooks/useCart';
import { usePageTitle } from '../hooks/usePageTitle';
import { useWishList } from '../hooks/useWishList';

const useStyles = () => ({
  media: {
    height: '60vh',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    m: '2rem',
  },
});

const ProductPage = () => {
  const { id } = useParams();
  const styles = useStyles();

  const navigate = useNavigate();

  const { data: prod, isLoading } = useProductQuery(id);
  const { isInCart, addToCart } = useCart();
  const { isInWish, toggleWish } = useWishList();

  usePageTitle(prod?.title);

  if (!prod || isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth='xl' height='calc(100vh)'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          my: { md: 'auto' },
          height: '90%',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: '2rem',
          pt: '4.8rem',
        }}
      >
        <Box sx={{ flex: '1', mx: 2, width: '100%' }}>
          <CardMedia sx={styles.media} image={prod.image} alt={prod.title} />
        </Box>
        <Box sx={{ flex: '1', width: '100%' }}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
                component='h2'
                sx={{ mb: '1rem' }}
              >
                {prod.title}
              </Typography>
              <Chip
                variant='outlined'
                label={
                  prod.category[0].toUpperCase() +
                  prod.category.slice(1).toLowerCase()
                }
                color='primary'
                sx={{ mb: '1rem' }}
              />
              <Typography variant='body1' color='text.secondary'>
                {prod.description}
              </Typography>
              <Typography
                variant='h6'
                color='text.primary'
                sx={{ mt: 2, mb: '0.8rem' }}
              >
                Price: ${prod.price}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '0.8rem',
                }}
              >
                <Rating
                  name='product-rating'
                  sx={{ color: 'primary.main' }}
                  value={prod['rating'].rate}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  variant='body1'
                  color='text.primary'
                  sx={{ fontWeight: 'bold' }}
                >
                  {prod['rating'].rate} stars
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  ({prod['rating'].count} reviews)
                </Typography>
              </Box>
            </CardContent>
            <CardActions
              sx={{
                p: '0.8rem',
                justifyContent: 'space-between',
              }}
            >
              <Box>
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
              </Box>
              <Button
                variant='outlined'
                color='primary'
                startIcon={
                  isInWish(prod._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
                onClick={(e) => {
                  e.preventDefault();
                  toggleWish(prod._id);
                }}
              >
                {isInWish(prod._id)
                  ? 'Remove from Wishlist'
                  : 'Add to Wishlist'}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: '4.8rem' }}>
        <IconButton onClick={() => navigate('/')} sx={{ mt: 2 }}>
          <ArrowBackIos /> Continue Shopping
        </IconButton>
      </Box>
    </Container>
  );
};

export default ProductPage;
