// app.js
const express = require('express');
console.log('✅ express loaded');

const cors = require('cors');
console.log('✅ cors loaded');

const connectDB = require('./config/db');
console.log('✅ DB config loaded');

const authRoutes = require('./routes/authRoutes');
console.log('✅ authRoutes loaded', typeof authRoutes);

const bookRoutes = require('./routes/bookRoutes');
console.log('✅ bookRoutes loaded', typeof bookRoutes);
const bookRequestRoutes = require('./routes/bookRequestRoutes');

const app = express();
console.log('✅ express app initialized');

connectDB();
console.log('✅ DB connected');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/book-requests', bookRequestRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Readwave Library API');
});

app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found', path: req.originalUrl });
});

module.exports = app;
