import { useMemo } from 'react';
import { getProduct } from '../../api/client';
import { useQuery } from './useQuery';

export const useProductQuery = (id) => {
  const key = `product-${id}`;
  const getProductFn = useMemo(() => () => getProduct(id), [id]);
  return useQuery(key, getProductFn);
};
