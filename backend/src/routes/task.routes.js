const express = require('express');
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const taskValidator = require('../validators/task.validator');

const router = express.Router();

router.post('/', authMiddleware, validate(taskValidator.createTask), taskController.createTask);
router.get('/', authMiddleware, validate(taskValidator.taskStatusQuery), taskController.getTasks);
router.get('/:id', authMiddleware, validate(taskValidator.taskIdParam), taskController.getTaskById);
router.put('/:id', authMiddleware, validate(taskValidator.updateTask), taskController.updateTask);
router.delete('/:id', authMiddleware, validate(taskValidator.taskIdParam), taskController.deleteTask);

module.exports = router;