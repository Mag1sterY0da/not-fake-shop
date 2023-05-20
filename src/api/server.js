import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import apiKeysRoutes from './routes/apiKeysRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(productRoutes);
app.use(apiKeysRoutes);

const { PORT, DB_NAME, DB_USER, PASSWORD } = process.env;
const URL = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.jgjtdhh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
