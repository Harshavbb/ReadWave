// routes/bookRequestRoutes.js
const express = require('express');
const router = express.Router();
const { requestBook, approveRequest, returnBook, getAllBookRequests, getMyRequests} = require('../controllers/bookRequestController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/request', protect, requestBook);
router.put('/approve/:id', protect, isAdmin, approveRequest);
router.post('/return/', protect, returnBook);
router.get('/', protect, isAdmin, getAllBookRequests);
router.get('/my-requests', protect, getMyRequests);


module.exports = router;
