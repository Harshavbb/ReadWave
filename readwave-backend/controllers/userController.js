// @desc    Get logged-in user profile
// @route   GET /api/users/profile
// @access  Private
const User = require('../models/User');
const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = { getUserProfile };
