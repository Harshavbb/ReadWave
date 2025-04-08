// routes/bookRequestRoutes.js
const express = require('express');
const router = express.Router();
const { requestBook, approveRequest  } = require('../controllers/bookRequestController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/request', protect, requestBook);
router.put('/approve/:id', protect, isAdmin, approveRequest);

module.exports = router;
