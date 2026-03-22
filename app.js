import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Author from './models/Author.js';
import Book from './models/Book.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Student from './models/Student.js';
import Course from './models/Course.js';
import Actor from './models/Actor.js';
import Movie from './models/Movie.js';

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

app.get('/test-students', async (req, res) => {
  try {
    const student = await Student.create({
      name: 'John Doe',
      email: 'john@example.com'
    });

    const course = await Course.create({
      title: 'JavaScript',
      description: 'Learn JS'
    });

    // связываем
    student.courses.push(course._id);
    await student.save();

    course.students.push(student._id);
    await course.save();

    res.json({ student, course });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/students', async (req, res) => {
  const students = await Student.find().populate('courses');
  res.json(students);
});

app.get('/courses', async (req, res) => {
  const courses = await Course.find().populate('students');
  res.json(courses);
});

app.get('/test-movies', async (req, res) => {
  try {
    const actor = await Actor.create({
      name: 'Leonardo DiCaprio',
      birthdate: new Date('1974-11-11')
    });

    const movie = await Movie.create({
      title: 'Inception',
      releaseYear: 2010
    });

    // связываем
    actor.movies.push(movie._id);
    await actor.save();

    movie.actors.push(actor._id);
    await movie.save();

    res.json({ actor, movie });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/actors', async (req, res) => {
  const actors = await Actor.find().populate('movies');
  res.json(actors);
});

app.get('/movies', async (req, res) => {
  const movies = await Movie.find().populate('actors');
  res.json(movies);
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});