const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { signToken } = require('../utils/jwt');

const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError('Email already in use', 400);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = signToken({ id: user._id });

  return { user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  const token = signToken({ id: user._id });
  return { user, token };
};

module.exports = { registerUser, loginUser };