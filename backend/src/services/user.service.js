const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  return user;
};

const updateUser = async (id, payload) => {
  if (payload.email) {
    const existing = await User.findOne({ email: payload.email, _id: { $ne: id } });
    if (existing) {
      throw new ApiError('Email already in use', 400);
    }
  }

  const updateData = { ...payload };
  if (payload.password) {
    updateData.password = await bcrypt.hash(payload.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  await Task.deleteMany({ userId: id });
  return user;
};

module.exports = { getUserById, updateUser, deleteUser };