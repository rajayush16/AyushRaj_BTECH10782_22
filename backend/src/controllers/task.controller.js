const ApiResponse = require('../utils/ApiResponse');
const taskService = require('../services/task.service');

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.id, req.validated.body);
    res.status(201).json(
      new ApiResponse({
        message: 'Task created',
        data: task,
      })
    );
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const status = req.validated?.query?.status;
    const tasks = await taskService.getTasks(req.user.id, status);
    res.json(
      new ApiResponse({
        message: 'Tasks fetched',
        data: tasks,
      })
    );
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.user.id, req.validated.params.id);
    res.json(
      new ApiResponse({
        message: 'Task fetched',
        data: task,
      })
    );
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.user.id,
      req.validated.params.id,
      req.validated.body
    );
    res.json(
      new ApiResponse({
        message: 'Task updated',
        data: task,
      })
    );
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.user.id, req.validated.params.id);
    res.json(
      new ApiResponse({
        message: 'Task deleted',
        data: null,
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };