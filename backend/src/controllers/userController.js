const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Login user
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Fetch user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Update user preferences
const updateUserPreferences = async (req, res) => {
  const { preferences } = req.body;
  
  const user = await User.findById(req.user.id);
  
  if (user) {
    user.preferences = preferences;
    await user.save();
    res.json({ message: 'Preferences updated', preferences: user.preferences });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, authUser, getUserProfile, updateUserPreferences };
