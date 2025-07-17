const jwt = require('jsonwebtoken');

const signJwt = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { signJwt, verifyJwt };