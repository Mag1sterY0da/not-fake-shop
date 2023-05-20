import { useContext } from 'react';
import { CartContext } from '../providers/CartProvider';

export const useCart = () => {
  return useContext(CartContext);
};
