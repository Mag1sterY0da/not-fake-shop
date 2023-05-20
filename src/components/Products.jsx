import { ShoppingCartCheckout } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, CardActions, Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishList } from '../hooks/useWishList';

const useStyles = () => ({
  media: {
    margin: '1.2rem',
    height: 360,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
});

const Products = memo(({ products }) => {
  const styles = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  const { isInCart, addToCart } = useCart();
  const { isInWish, toggleWish } = useWishList();

  return (
    <Grid
      container
      spacing={3}
      marginTop={0}
      alignItems='stretch'
      sx={{ mt: '1.2rem', mb: '2.4rem' }}
    >
      {products?.map((prod) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={prod._id}>
          <Card
            sx={{
              '&:hover': { boxShadow: 4 },
              position: 'relative',
              boxShadow: 2,
            }}
          >
            <Link to={`/products/${prod._id}`} style={theme.links.primary}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  zIndex: '1',
                }}
              >
                {isInWish(prod._id) ? (
                  <FavoriteIcon
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWish(prod._id);
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWish(prod._id);
                    }}
                  />
                )}
              </Box>
              <CardMedia
                sx={styles.media}
                image={prod.image}
                title={prod.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='h2'
                  noWrap
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  {prod.title}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Rating
                    name='product-rating'
                    sx={{ color: 'primary.main' }}
                    value={prod.rating.rate}
                    precision={0.5}
                    readOnly
                  />
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ ml: 1 }}
                  >
                    ({prod.rating.count} reviews)
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
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
                  </Box>
                  <CardActions sx={{ padding: 0 }}>
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
                  </CardActions>
                </Box>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

Products.propTypes = {
  products: PropTypes.array.isRequired,
};

Products.displayName = 'Products';

export default Products;
