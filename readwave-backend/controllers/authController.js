// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 🔐 Generate JWT token
// 🔐 Generate JWT token with role
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, // ✅ include role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ✅ Register new user
exports.register = async (req, res) => {
  const { name, email, password, role, rollNo, section, year, department } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({
      name,
      email,
      password,
      role,
      rollNo,
      section,
      year,
      department,
    });

    const token = generateToken(user);


    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        section: user.section,
        year: user.year,
        department: user.department,
        booksTaken: user.booksTaken,
        fine: user.fine,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login user
exports.login = async (req, res) => {
  console.log('✅ Login route was hit');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);


    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
