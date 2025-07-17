const { verifyJwt } = require('../utils/jwt');
const { redisClient } = require('../config/redis'); // <-- Fix import

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyJwt(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const session = await redisClient.get(decoded.sub);
  if (!session) {
    return res.status(401).json({ message: 'Session expired' });
  }

  req.user = JSON.parse(session);
  next();
};

module.exports = authMiddleware;