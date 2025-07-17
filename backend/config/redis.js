require('dotenv').config(); // Load environment variables from .env file

const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err.message);
});

// Utility to check Redis connection status
const isRedisConnected = () => redisClient.status === 'ready';

module.exports = { redisClient, isRedisConnected };