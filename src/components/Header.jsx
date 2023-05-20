import { AccountCircle } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Box, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishList } from '../hooks/useWishList';
import SignInModal from './SignInModal';

const Header = () => {
  const { cartProducts } = useCart();
  const { wishProducts } = useWishList();
  const theme = useTheme();

  const [toggleDialog, setToggleDialog] = useState(false);

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          <Link to='/' style={theme.links.primary}>
            Not Fake Shop
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: '1.2rem' }}>
          <Link to='/wish' style={theme.links.primary}>
            <IconButton color='inherit' aria-label='wish'>
              <Badge badgeContent={wishProducts.length} color='secondary'>
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to='/cart' style={theme.links.primary}>
            <IconButton color='inherit' aria-label='cart'>
              <Badge badgeContent={cartProducts.length} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Box>
            <IconButton
              color='inherit'
              aria-label='account'
              onClick={() => setToggleDialog(true)}
            >
              <AccountCircle />
            </IconButton>
            <SignInModal
              toggleDialog={toggleDialog}
              setToggleDialog={setToggleDialog}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
