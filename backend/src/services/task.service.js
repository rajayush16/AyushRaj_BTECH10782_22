const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

const createTask = async (userId, payload) => {
  return Task.create({ ...payload, userId });
};

const getTasks = async (userId, status) => {
  const filter = { userId };
  if (status) {
    filter.status = status;
  }
  return Task.find(filter).sort({ created_at: -1 });
};

const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) {
    throw new ApiError('Task not found', 404);
  }
  return task;
};

const updateTask = async (userId, taskId, payload) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    payload,
    { new: true }
  );

  if (!task) {
    throw new ApiError('Task not found', 404);
  }

  return task;
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) {
    throw new ApiError('Task not found', 404);
  }
  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};