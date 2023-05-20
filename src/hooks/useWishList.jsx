import { useContext } from 'react';
import { WishListContext } from '../providers/WishProvider.jsx';

export const useWishList = () => {
  return useContext(WishListContext);
};
