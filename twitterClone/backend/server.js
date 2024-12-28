import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use('/api/auth',  authRoutes);

app.get('/', (req, res) => {
  res.send('Server is ready');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectMongoDB();
})


//dbUserPassword
//dbUser