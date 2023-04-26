import express from 'express';
import mongoose from 'mongoose';
import mongoURI from './config/keys.js';
import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';

const app = express();

// connect MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB is connected'))
  .catch(() => console.log('ERROR MongoDB'));

// pasring
app.use(express.json()); //? For express will be can reade json from request / parsing
app.use('/article/uploads', express.static('uploads')); //? Setup folder like static for setup URL

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/auth', authRoutes);
app.use('/article', articleRoutes);

export default app;
