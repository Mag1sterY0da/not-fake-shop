import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useProductsQuery } from '../hooks/data/useProductsQuery';

export const CartContext = createContext(null);

const getInitialCartProducts = () => {
  const storedCartProducts = localStorage.getItem('cartProducts');
  if (!storedCartProducts) {
    return [];
  }

  return JSON.parse(storedCartProducts);
};

export const CartProvider = ({ children }) => {
  CartProvider.propTypes = {
    children: PropTypes.node,
  };

  const [cartProducts, setCartProducts] = useState(getInitialCartProducts());
  const { data: products } = useProductsQuery();

  const addToCart = useCallback(
    (productId) => {
      if (!products) return;
      const prod = products.find((prod) => prod._id === productId);
      const cartProd = cartProducts.find((prod) => prod._id === productId);
      if (!cartProd) {
        setCartProducts((prevCarProducts) => [
          ...prevCarProducts,
          {
            _id: productId,
            title: prod.title,
            image: prod.image,
            price: prod.price,
            quantity: 1,
          },
        ]);
      }
    },
    [cartProducts, products]
  );

  const changeQuantity = useCallback(
    (productId, quantity) => {
      if (!products) {
        return;
      }
      const prod = products.find((prod) => prod._id === productId);
      const cartProd = cartProducts.find((prod) => prod._id === productId);

      if (quantity === 0) {
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((prod) => prod._id !== productId)
        );
        return;
      }

      if (cartProd) {
        setCartProducts((prevCartProducts) =>
          prevCartProducts.reduce((acc, prod) => {
            prod._id === productId
              ? acc.push({ ...prod, quantity: quantity })
              : acc.push(prod);
            return acc;
          }, [])
        );
      } else {
        setCartProducts((prevCarProducts) => [
          ...prevCarProducts,
          {
            _id: productId,
            title: prod.title,
            image: prod.image,
            price: prod.price,
            quantity: quantity,
          },
        ]);
      }
    },
    [cartProducts, products]
  );

  const isInCart = useCallback(
    (productId) => cartProducts.some((prod) => prod._id === productId),
    [cartProducts]
  );

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{ cartProducts, addToCart, changeQuantity, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
