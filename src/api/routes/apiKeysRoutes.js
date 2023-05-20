import express from 'express';
import { getGoogleApiKey } from '../controllers/apiKeysController.js';

const apiKeysRoutes = express.Router();

apiKeysRoutes.get('/api-keys/google', getGoogleApiKey);

export default apiKeysRoutes;
