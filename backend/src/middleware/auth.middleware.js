const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError('Unauthorized', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    return next(new ApiError('Invalid token', 401));
  }
};

module.exports = authMiddleware;