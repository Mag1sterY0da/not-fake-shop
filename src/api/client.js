import { ClientError } from './errors/clientError';

const API_URL = 'https://not-fake-shop-backend.onrender.com/';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}products`);

    return await response.json();
  } catch (e) {
    throw new ClientError(e.message);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}products/${id}`);

    return await response.json();
  } catch (e) {
    throw new ClientError(e.message);
  }
};

export const getProductsByCategories = async (
  category,
  ratingFilter,
  minPrice,
  maxPrice,
  debouncedSearch
) => {
  try {
    console.log(
      `${API_URL}products/?category=${category}&ratingFilter=${ratingFilter}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${debouncedSearch}`
    );
    const response = await fetch(
      `${API_URL}products/?category=${category}&ratingFilter=${ratingFilter}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${debouncedSearch}`
    );

    return await response.json();
  } catch (e) {
    throw new ClientError(e.message);
  }
};

export const getGoogleApiKey = async () => {
  try {
    const response = await fetch(`${API_URL}api-keys/google`);

    return await response.text();
  } catch (e) {
    throw new ClientError(e.message);
  }
};

export const getAddress = async (latitude, longitude) => {
  try {
    const key = await getGoogleApiKey();

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`
    );

    return await response.json();
  } catch (e) {
    throw new ClientError(e.message);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(
      'https://fakestoreapi.com/products/categories'
    );

    return await response.json();
  } catch (e) {
    throw new ClientError(e.message);
  }
};
