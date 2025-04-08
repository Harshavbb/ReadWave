// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// 🔐 Admin-protected routes
router.post('/', protect, isAdmin, addBook);
router.put('/:id', protect, isAdmin, updateBook);
router.delete('/:id', protect, isAdmin, deleteBook);

// 📖 Public or logged-in user routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

module.exports = router;
