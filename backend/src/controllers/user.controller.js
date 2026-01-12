const ApiResponse = require('../utils/ApiResponse');
const userService = require('../services/user.service');

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(
      new ApiResponse({
        message: 'Profile fetched',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.user.id, req.validated.body);
    res.json(
      new ApiResponse({
        message: 'Profile updated',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    await userService.deleteUser(req.user.id);
    res.json(
      new ApiResponse({
        message: 'Profile deleted',
        data: null,
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, deleteProfile };