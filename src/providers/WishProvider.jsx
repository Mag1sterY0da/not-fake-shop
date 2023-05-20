import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useProductsQuery } from '../hooks/data/useProductsQuery';

export const WishListContext = createContext(null);

const getInitialWishProducts = () => {
  const storedWishItems = localStorage.getItem('wishProducts');
  if (!storedWishItems) {
    return [];
  }

  return JSON.parse(storedWishItems);
};

export const WishProvider = ({ children }) => {
  WishProvider.propTypes = {
    children: PropTypes.node,
  };

  const [wishProducts, setWishProducts] = useState(getInitialWishProducts());
  const { data: products } = useProductsQuery();

  const toggleWish = useCallback(
    (productId) => {
      if (!products) {
        return;
      }
      const prod = products.find((prod) => prod._id === productId);
      const wishProduct = wishProducts.find((prod) => prod._id === productId);

      if (wishProduct) {
        setWishProducts((prevWishProducts) =>
          prevWishProducts.filter((prod) => prod._id !== productId)
        );
      } else {
        setWishProducts((prevWishProducts) => [
          ...prevWishProducts,
          {
            _id: productId,
            title: prod.title,
            price: prod.price,
            image: prod.image,
          },
        ]);
      }
    },
    [wishProducts, products]
  );

  const isInWish = useCallback(
    (productId) => {
      if (!products) {
        return;
      }
      return !!wishProducts.find((prod) => prod._id === productId);
    },
    [wishProducts, products]
  );

  useEffect(() => {
    localStorage.setItem('wishProducts', JSON.stringify(wishProducts));
  }, [wishProducts]);

  return (
    <WishListContext.Provider value={{ wishProducts, toggleWish, isInWish }}>
      {children}
    </WishListContext.Provider>
  );
};
