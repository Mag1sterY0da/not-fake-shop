import { useQuery } from './useQuery';
import { getProduct } from '../../api/client';
import { useMemo } from 'react';

export const useProductQuery = id => {
  const key = `product-${id}`;
  const getProductFn = useMemo(() => () => getProduct(id), [id]);
  return useQuery(key, getProductFn);
};
