import { useMemo } from 'react';
import { getProducts, getProductsByCategories } from '../../api/client';
import { useQuery } from './useQuery';

export const useProductsQuery = () => {
  return useQuery('products', getProducts);
};

export const useProductsByCategoryQuery = (
  category,
  ratingFilter,
  minPrice,
  maxPrice,
  seatch
) => {
  const key = `products-${category}-${ratingFilter}-${minPrice}-${maxPrice}-${seatch}`;
  const getProductFn = useMemo(
    () => () =>
      getProductsByCategories(
        category,
        ratingFilter,
        minPrice,
        maxPrice,
        seatch
      ),
    [category, ratingFilter, minPrice, maxPrice, seatch]
  );
  return useQuery(key, getProductFn);
};
