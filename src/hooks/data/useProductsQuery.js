import { useQuery } from './useQuery';
import { getProducts } from '../../api/client';

export const useProductsQuery = () => {
  return useQuery('products', getProducts);
};
