import express from 'express';
import { ENV } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

console.log('Mongo URI:', ENV.MONGODB_URI);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port http://localhost:${ENV.PORT}`);
});