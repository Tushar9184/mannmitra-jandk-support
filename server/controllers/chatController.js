import asyncHandler from 'express-async-handler';
import Chat from '../models/Chat.js';
import { getBotResponse, analyzeSentiment } from '../services/chatbotService.js';

// @desc    Get chat history
// @route   GET /api/chat
// @access  Private
const getChatHistory = asyncHandler(async (req, res) => {
    const chats = await Chat.find({ user: req.user._id })
        .sort({ createdAt: 1 })
        .limit(50); // Fetch last 50 messages
    res.json(chats);
});

// @desc    Send a message
// @route   POST /api/chat
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
    const { message, lang } = req.body;

    if (!message) {
        res.status(400);
        throw new Error('Message is required');
    }

    // 1. Save User Message
    const userChat = await Chat.create({
        user: req.user._id,
        message,
        sender: 'user',
        sentiment: analyzeSentiment(message),
    });

    // 2. Generate Bot Response
    const botReplyText = getBotResponse(message, lang || req.user.language || 'en');

    // 3. Save Bot Message
    const botChat = await Chat.create({
        user: req.user._id,
        message: botReplyText,
        sender: 'bot',
        isRead: true,
    });

    res.status(201).json([userChat, botChat]);
});

export { getChatHistory, sendMessage };
