import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Author from './models/Author.js';
import Book from './models/Book.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3333;

// подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.log(' DB error:', err));


// главный роут
app.get('/', (req, res) => {
  res.send('Server is running');
});


// тест — создать автора и книгу
app.get('/test', async (req, res) => {
  try {
    const author = await Author.create({
      name: 'J.K. Rowling',
      bio: 'Harry Potter author'
    });

    const book = await Book.create({
      title: 'Harry Potter',
      publishedDate: new Date(),
      author: author._id
    });

    res.json({ author, book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// получить книги с автором
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/test-products', async (req, res) => {
  try {
    const category = await Category.create({
      name: 'Electronics'
    });

    const product = await Product.create({
      name: 'iPhone',
      price: 1000,
      category: category._id
    });

    res.json({ category, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});