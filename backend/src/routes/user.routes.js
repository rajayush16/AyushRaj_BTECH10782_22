const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const userValidator = require('../validators/user.validator');

const router = express.Router();

router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, validate(userValidator.updateProfile), userController.updateProfile);
router.delete('/me', authMiddleware, userController.deleteProfile);

module.exports = router;