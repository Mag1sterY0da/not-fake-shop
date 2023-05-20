import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SuccessOrderPage from './pages/SuccessOrderPage';
import WishPage from './pages/WishPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#7e7e7e',
    },
  },
  links: {
    primary: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/wish' element={<WishPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/success' element={<SuccessOrderPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
