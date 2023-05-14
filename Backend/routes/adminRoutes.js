import express from 'express';
import { loginAdmin, registerAdmin, getMe, logoutAdmin, forgotPassword, resetPassword, changePassword } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);

// Protected routes
router.use(protect);
router.post('/signup', registerAdmin);
router.get('/me/:id', getMe);
router.get('/logout', logoutAdmin);
router.post('/forgotPassword', forgotPassword);
router.get('/resetPassword/:id/:token', resetPassword);
router.put('/resetPassword/:id/:token', changePassword);

export default router;
