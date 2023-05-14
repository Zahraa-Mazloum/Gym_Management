import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token  
    token = req.headers.authorization.split(' ')[1];
    console.log(`Token: ${token}`);
  }

  if (!token) {
    console.log('No token found');
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    // Verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Set user data on request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.log('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized' });
  }
});
