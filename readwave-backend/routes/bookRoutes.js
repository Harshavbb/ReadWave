// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// Public or protected depending on your future auth logic
router.post('/', addBook);             // Add book
router.get('/', getAllBooks);          // Get all books
router.get('/:id', getBookById);       // Get book by ID
router.put('/:id', updateBook);        // Update book
router.delete('/:id', deleteBook);     // Delete book

module.exports = router;
