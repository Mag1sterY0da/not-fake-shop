import { Container } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductsByCategories } from '../api/client';
import Filters from '../components/Filters';
import LoadingSpinner from '../components/LoadingSpinner';
import Products from '../components/Products';
import Search from '../components/Search';
import { useCategoriesQuery } from '../hooks/data/useCategoriesQuery.js';
import { useProductsQuery } from '../hooks/data/useProductsQuery.js';
import { useDebounce } from '../hooks/useDebounce';
import { usePageTitle } from '../hooks/usePageTitle';

export const HomePage = () => {
  // const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  usePageTitle();

  const { data: products, isLoading: isProductsLoading } = useProductsQuery();
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const [showedProducts, setShowedProducts] = useState([]);

  const {
    category: categoryFromQuery = 'all',
    ratingFilter: ratingFilterFromQuery = false,
    minPrice: minPriceFromQuery = '',
    maxPrice: maxPriceFromQuery = '',
    search: searchFromQuery = '',
  } = Object.fromEntries(queryParams.entries());

  const formik = useFormik({
    initialValues: {
      category: categoryFromQuery !== null ? categoryFromQuery : 'all',
      ratingFilter: ratingFilterFromQuery === true,
      minPrice: minPriceFromQuery !== null ? minPriceFromQuery : '',
      maxPrice: maxPriceFromQuery !== null ? maxPriceFromQuery : '',
      search: searchFromQuery !== null ? searchFromQuery : '',
    },
  });

  const { values, handleChange, onSubmit } = formik;

  const debouncedSearch = useDebounce(values.search, 500);

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
  }, [
    debouncedSearch,
    values.category,
    values.ratingFilter,
    values.minPrice,
    values.maxPrice,
  ]);

  useEffect(() => {
    const queryString = `${
      values.category === 'all' ? '' : `category=${values.category}`
    }${
      values.ratingFilter === false
        ? ''
        : `&ratingFilter=${values.ratingFilter}`
    }${values.minPrice === '' ? '' : `&minPrice=${values.minPrice}`}${
      values.maxPrice === '' ? '' : `&maxPrice=${values.maxPrice}`
    }${values.search.length === 0 ? '' : `&search=${values.search}`}`;
    const url = queryString ? `/?${queryString}` : '/';

    window.history.pushState(null, null, url);
  }, [
    values.category,
    values.maxPrice,
    values.minPrice,
    values.ratingFilter,
    values.search,
  ]);

  const setScrollPosition = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  };

  useEffect(() => {
    if (showedProducts.length !== 0) {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      const scrollPosition = savedScrollPosition
        ? parseInt(savedScrollPosition)
        : 0;
      window.scrollTo(0, scrollPosition);
    }
  }, [showedProducts]);

  if (
    !products ||
    isProductsLoading ||
    !categories ||
    isCategoriesLoading ||
    showedProducts.length === 0
  )
    return <LoadingSpinner />;

  return (
    <Container maxWidth='xl'>
      {showedProducts.length !== 0 && (
        <>
          <Search
            search={values.search}
            handleChange={handleChange}
            onSubmit={onSubmit}
          />
          <Filters
            categories={categories}
            minPrice={values.minPrice.toString()}
            maxPrice={values.maxPrice.toString()}
            category={values.category}
            ratingFilter={values.ratingFilter}
            handleChange={handleChange}
          />
          <Products
            products={showedProducts}
            setScrollPosition={setScrollPosition}
          />
        </>
      )}
    </Container>
  );
};

export default HomePage;
