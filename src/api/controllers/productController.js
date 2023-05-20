import { handleServerError } from '../errors/serverError.js';
import Product from '../models/product.js';

export const getProducts = (req, res) => {
  const { category, ratingFilter, minPrice, maxPrice, search } = req.query;

  const filters = {};

  if (category && category !== 'all') {
    filters.category = category;
  }

  if (ratingFilter === 'true') {
    filters['rating.rate'] = { $gte: 4 };
  }

  if (minPrice) {
    filters.price = { $gte: Number(minPrice) };
  }

  if (maxPrice) {
    filters.price = { ...filters.price, $lte: Number(maxPrice) };
  }

  if (search) {
    filters.title = { $regex: search, $options: 'i' };
  }

  Product.find(filters)
    .then((products) => {
      res.json(products);
    })
    .catch((err) => handleServerError(err, res));
};

export const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => handleServerError(err, res));
};
