import express from 'express';

import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

const productRoutes = express.Router();

productRoutes.get('/products', getProducts);

productRoutes.get('/products/:id', getProductById);

export default productRoutes;
