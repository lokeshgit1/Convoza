import express from 'express';
import { ENV } from './config/env.js';
import { connetDB } from './config/db.js';

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});
 

app.listen(ENV.PORT, () => {
   connetDB().then(() => {
        console.log('Database connected');
    }).catch((error) => {
        console.error('Database connection failed:', error);
    });
  console.log(`Server is running on port http://localhost:${ENV.PORT}`);
});