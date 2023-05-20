import { useQuery } from './useQuery';
import { getCategories } from '../../api/client';

export const useCategoriesQuery = () => {
  return useQuery('categories', getCategories);
};
