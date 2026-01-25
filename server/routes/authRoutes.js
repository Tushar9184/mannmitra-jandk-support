import express from 'express';
const router = express.Router();
import {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);

export default router;
