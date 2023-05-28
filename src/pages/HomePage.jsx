import { SentimentDissatisfied } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductsByCategories } from '../api/client';
import Filters from '../components/Filters';
import LoadingSpinner from '../components/LoadingSpinner';
import Products from '../components/Products';
import Search from '../components/Search';
import { useCategoriesQuery } from '../hooks/data/useCategoriesQuery.js';
import { useDebounce } from '../hooks/useDebounce';
import { usePageTitle } from '../hooks/usePageTitle';

export const HomePage = () => {
  const location = useLocation();
  usePageTitle();

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const [showedProducts, setShowedProducts] = useState([]);

  const queryParamsData = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return Object.fromEntries(queryParams.entries());
  }, [location.search]);

  const {
    category: categoryFromQuery = 'all',
    ratingFilter: ratingFilterFromQuery = false,
    minPrice: minPriceFromQuery = '',
    maxPrice: maxPriceFromQuery = '',
    search: searchFromQuery = '',
  } = queryParamsData;

  const formik = useFormik({
    initialValues: {
      category: categoryFromQuery !== null ? categoryFromQuery : 'all',
      ratingFilter: Boolean(ratingFilterFromQuery),
      minPrice: minPriceFromQuery !== null ? minPriceFromQuery : '',
      maxPrice: maxPriceFromQuery !== null ? maxPriceFromQuery : '',
      search: searchFromQuery !== null ? searchFromQuery : '',
    },
    onSubmit: async (values) => {
      try {
        const products = await getProductsByCategories(
          values.category,
          values.ratingFilter,
          values.minPrice,
          values.maxPrice,
          debouncedSearch
        );

        if (products !== showedProducts) {
          setShowedProducts(products);

          const queryString = `${
            values.category === 'all' ? '' : `category=${values.category}`
          }${
            values.ratingFilter === false
              ? ''
              : `&ratingFilter=${values.ratingFilter}`
          }${values.minPrice === '' ? '' : `&minPrice=${values.minPrice}`}${
            values.maxPrice === '' ? '' : `&maxPrice=${values.maxPrice}`
          }${debouncedSearch.length === 0 ? '' : `&search=${debouncedSearch}`}`;
          const url = queryString ? `/?${queryString}` : '/';

          window.history.pushState(null, null, url);

          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });

          setScrollPosition();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { values, handleChange, handleSubmit } = formik;

  useEffect(() => {
    (async () => {
      try {
        const products = await getProductsByCategories(
          values.category,
          values.ratingFilter,
          values.minPrice,
          values.maxPrice,
          debouncedSearch
        );

        setShowedProducts(products);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useDebounce(values.search, 0);

  const setScrollPosition = useCallback(() => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  }, []);

  useEffect(() => {
    if (showedProducts.length !== 0) {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      const scrollPosition = savedScrollPosition
        ? parseInt(savedScrollPosition)
        : 0;
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [showedProducts]);

  if (!categories || isCategoriesLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth='xl'>
      <Search
        search={values.search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Filters
        categories={categories}
        minPrice={values.minPrice.toString()}
        maxPrice={values.maxPrice.toString()}
        category={values.category}
        ratingFilter={values.ratingFilter}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {(showedProducts.length !== 0 && (
        <Products
          products={showedProducts}
          setScrollPosition={setScrollPosition}
        />
      )) || (
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.2rem',
              my: '2.4rem',
            }}
          >
            <Typography variant='h6' sx={{ textAlign: 'center' }}>
              No products found
            </Typography>
            <SentimentDissatisfied fontSize='large' />
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default HomePage;
