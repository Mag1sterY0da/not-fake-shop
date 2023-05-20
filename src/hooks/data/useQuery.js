import { useCallback, useEffect, useState } from 'react';
import { useQueryContext } from '../useQueryContext';

export const useInvalidateQuery = (k) => {
  const queryClient = useQueryContext();

  return useCallback(() => queryClient.invalidate(k), [k, queryClient]);
};

export const useQuery = (key, f) => {
  const queryClient = useQueryContext();

  const [state, setState] = useState({
    data: undefined,
    isLoading: false,
    error: undefined,
  });

  useEffect(() => {
    const unsubscribe = queryClient.run(key, f, (newState) => {
      setState(newState);
    });

    return () => unsubscribe();
  }, [f, key, queryClient]);

  return state;
};
