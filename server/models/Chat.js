import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            enum: ['user', 'bot', 'professional'],
            required: true,
        },
        sentiment: {
            type: String, // e.g., 'Positive', 'Negative', 'Neutral'
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Privacy: Auto-delete messages after 30 days (2592000 seconds)
chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

export default mongoose.model('Chat', chatSchema);
