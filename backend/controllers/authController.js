// const bcrypt = require('bcrypt');
// const User = require('../models/user.model');
// const { signJwt } = require('../utils/jwt');
// const { redisClient, isRedisConnected } = require('../config/redis');

// const register = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Ensure password is provided and is a string
//     if (!password || typeof password !== 'string') {
//       return res.status(400).json({ message: 'Password is required and must be a string' });
//     }

//     // Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Email already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword });
//     await user.save();

//     const token = signJwt({ sub: user._id }, '1h');
//     if (isRedisConnected()) {
//       await redisClient.set(
//         user._id.toString(),
//         JSON.stringify({ id: user._id, email }),
//         'EX',
//         3600
//       );
//     }

//     res.status(201).json({ token });
//   } catch (error) {
//     console.error('Registration error:', error);
//     // Handle duplicate key error from MongoDB
//     if (error.code === 11000) {
//       return res.status(409).json({ message: 'Email already registered' });
//     }
//     res.status(500).json({ message: 'Registration failed' });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = signJwt({ sub: user._id }, '1h');
//     if (isRedisConnected()) {
//       await redisClient.set(
//         user._id.toString(),
//         JSON.stringify({ id: user._id, email }),
//         'EX',
//         3600
//       );
//     }

//     res.json({ token });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Login failed' });
//   }
// };

// module.exports = { register, login };


const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { signJwt } = require('../utils/jwt');
const { redisClient, isRedisConnected } = require('../config/redis');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Ensure email and password are provided and valid
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password are required and must be strings' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = signJwt({ sub: user._id }, '1h');
    if (isRedisConnected()) {
      await redisClient.set(
        user._id.toString(),
        JSON.stringify({ id: user._id, email }),
        'EX',
        3600
      );
    } else {
      console.warn('Redis not connected, skipping session storage');
    }
    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', { message: error.message, stack: error.stack, code: error.code });
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password are required and must be strings' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signJwt({ sub: user._id }, '1h');
    if (isRedisConnected()) {
      await redisClient.set(
        user._id.toString(),
        JSON.stringify({ id: user._id, email }),
        'EX',
        3600
      );
    } else {
      console.warn('Redis not connected, skipping session storage');
    }
    res.json({ token });
  } catch (error) {
    console.error('Login error:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const me = async (req, res) => {
  try {
    const user = req.user; // Set by authMiddleware
    res.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error('Me endpoint error:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
  }
};

module.exports = { register, login, me };