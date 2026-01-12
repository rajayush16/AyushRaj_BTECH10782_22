const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

const createTask = async (userId, payload) => {
  const data = { ...payload, userId };
  if (data.status === 'completed' && !data.completed_date) {
    data.completed_date = new Date();
  }
  return Task.create(data);
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
  const data = { ...payload };
  if (data.status === 'completed' && !data.completed_date) {
    data.completed_date = new Date();
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    data,
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
