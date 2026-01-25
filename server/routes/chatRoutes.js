import express from 'express';
const router = express.Router();
import { getChatHistory, sendMessage } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(protect, getChatHistory)
    .post(protect, sendMessage);

export default router;
