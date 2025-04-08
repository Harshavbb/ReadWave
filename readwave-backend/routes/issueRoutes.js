const express = require('express');
const router = express.Router();
const { requestBook, getRequests, respondToRequest } = require('../controllers/issueController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

router.post('/request/:bookId', authMiddleware, requestBook); // student request
router.get('/', authMiddleware, isAdmin, getRequests); // admin fetch all
router.put('/:requestId', authMiddleware, isAdmin, respondToRequest); // admin approve/reject

module.exports = router;
