import dotenv from 'dotenv';

dotenv.config();

export const getGoogleApiKey = (_, res) => {
  res.send(process.env.GOOGLE_API_KEY);
};
