const ApiResponse = require('../utils/ApiResponse');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server error';
  const details = err.details || null;

  res.status(statusCode).json(
    new ApiResponse({
      success: false,
      message,
      data: { details, statusCode },
    })
  );
};

module.exports = errorHandler;