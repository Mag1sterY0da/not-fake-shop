import { useContext } from 'react';
import { QueryContext } from '../providers/QueryProvider';

export const useQueryContext = () => {
  return useContext(QueryContext);
};
