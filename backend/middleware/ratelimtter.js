const rateLimit = require('express-rate-limit');
const RateLimitRedisStore = require('rate-limit-redis');
const { redisClient } = require('../config/redis');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: { message: 'Too many login attempts, please try again after 15 minutes' },
  store: new RateLimitRedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per window
  message: { message: 'Too many requests, please try again after 1 minute' },
  store: new RateLimitRedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

module.exports = { loginLimiter, apiLimiter };