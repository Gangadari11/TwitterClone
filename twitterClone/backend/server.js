import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); //to parse req.body
app.use(express.urlencoded({ extended: false })); //to parse from data(urlencoded)
app.use(cookieParser());
app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectMongoDB();
})


//dbUserPassword
//dbUser