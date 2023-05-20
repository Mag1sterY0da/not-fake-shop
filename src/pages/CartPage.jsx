import {
  Add,
  ArrowBackIos,
  Remove,
  SentimentVeryDissatisfied,
  ShoppingBasketOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CardActions,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const CartPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  usePageTitle();

  const navigate = useNavigate();
  const [toggleDialog, setToggleDialog] = useState(false);
  const [prodId, setProdId] = useState(null);

  const showDialog = (id) => {
    setProdId(id);
    setToggleDialog(true);
  };

  const { cartProducts, changeQuantity } = useCart();

  const totalPrice = cartProducts
    .reduce((acc, prod) => {
      return acc + prod.price * prod.quantity;
    }, 0)
    .toFixed(2);

  const handleQuantityChange = (id, quantity) =>
    quantity <= 0 ? showDialog(id) : changeQuantity(id, quantity);

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
        Your Cart Items
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.4rem',
          mb: '2.4rem',
        }}
      >
        {cartProducts.length > 0 ? (
          cartProducts.map((prod, i) => (
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
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color='primary'
                      onClick={() =>
                        handleQuantityChange(prod._id, prod.quantity - 1)
                      }
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      type='text'
                      variant='standard'
                      sx={{
                        width: '3.2rem',
                        '& input': {
                          textAlign: 'center',
                        },
                      }}
                      value={prod.quantity}
                      onChange={(e) =>
                        handleQuantityChange(prod._id, parseInt(e.target.value))
                      }
                    />
                    <IconButton
                      color='primary'
                      onClick={() =>
                        handleQuantityChange(prod._id, prod.quantity + 1)
                      }
                    >
                      <Add />
                    </IconButton>
                  </CardActions>
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
              Your cart is empty
            </Typography>
            <SentimentVeryDissatisfied fontSize='large' />
          </Box>
        )}
      </Box>
      {cartProducts.length > 0 ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              alignItems: 'flex-end',
              mb: '2.4rem',
            }}
          >
            <Typography variant='h5' component='p'>
              Total Price: ${totalPrice}
            </Typography>
          </Box>
          <Box sx={{ mb: '1.8rem' }}>
            <Link to='/checkout' style={theme.links.primary}>
              <Button
                variant='contained'
                sx={{ width: '100%' }}
                startIcon={<ShoppingBasketOutlined sx={{ mr: 1 }} />}
              >
                Checkout
              </Button>
            </Link>
          </Box>
        </>
      ) : null}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '2.4rem' }}>
        <IconButton onClick={() => navigate('/')} sx={{ mt: 2 }}>
          <ArrowBackIos /> Continue Shopping
        </IconButton>
      </Box>
      <Dialog open={toggleDialog} onClose={() => setToggleDialog(false)}>
        <DialogTitle>Remove item from cart?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this item from your cart? You can
            always add it again later if you change your mind.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToggleDialog(false)}>No</Button>
          <Button
            onClick={() => {
              setToggleDialog(false);
              changeQuantity(prodId, 0);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
