import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTitle = prodTitle => {
  const location = useLocation();

  useEffect(() => {
    const routeTitleMap = {
      '/': 'Home | Not Fake Shop',
      '/cart': 'Cart | Not Fake Shop',
      '/wish': 'Wishlist | Not Fake Shop',
      '/checkout': 'Checkout | Not Fake Shop',
    };

    const currentPath = location.pathname;
    const pageTitle = routeTitleMap[currentPath] || 'Not Fake Shop';
    document.title = pageTitle;
  }, [location]);

  useEffect(() => {
    if (prodTitle) {
      document.title = `${prodTitle} | Not Fake Shop`;
    }
  }, [prodTitle]);
};
