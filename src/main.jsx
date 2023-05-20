import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { CartProvider } from './providers/CartProvider';
import { QueryProvider } from './providers/QueryProvider';
import { WishProvider } from './providers/WishProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryProvider>
      <CartProvider>
        <WishProvider>
          <App />
        </WishProvider>
      </CartProvider>
    </QueryProvider>
  </React.StrictMode>
);
