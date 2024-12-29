import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

import connectMongoDB from './db/connectMongoDB.js';


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); //to parse req.body
app.use(express.urlencoded({ extended: false })); //to parse from data(urlencoded)
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is ready');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectMongoDB();
})


//dbUserPassword
//dbUser