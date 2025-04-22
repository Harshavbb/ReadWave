const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

console.log('✅ getUserProfile loaded:', typeof getUserProfile);
console.log('✅ protect loaded:', typeof protect);

router.get('/profile', protect, getUserProfile);

module.exports = router;
