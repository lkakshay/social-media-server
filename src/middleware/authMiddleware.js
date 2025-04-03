const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token using the ACCESS secret
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      // Get user from token (excluding password)
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        // Handle case where user associated with token no longer exists
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      // Handle token verification errors (expired, invalid)
      console.error('Token verification failed:', error.message);
      if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
      } else {
          return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect }; 