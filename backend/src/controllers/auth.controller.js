const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.validated.body;
    const { user, token } = await authService.registerUser({ name, email, password });

    res.status(201).json(
      new ApiResponse({
        message: 'Registration successful',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
          },
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.validated.body;
    const { user, token } = await authService.loginUser({ email, password });

    res.json(
      new ApiResponse({
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
          },
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.json(
    new ApiResponse({
      message: 'Logout successful',
      data: null,
    })
  );
};

module.exports = { register, login, logout };