import PropTypes from 'prop-types';
import { createContext } from 'react';
import { QueryClient } from '../utils/queryClient';

export const QueryContext = createContext(new QueryClient());

export const QueryProvider = ({ children }) => {
  QueryProvider.propTypes = {
    children: PropTypes.node,
  };

  return (
    <QueryContext.Provider value={new QueryClient()}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
