import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        role: {
            type: String,
            enum: ['user', 'professional', 'admin'],
            default: 'user',
        },
        alias: {
            type: String, // Public display name for anonymity
            default: function () {
                return 'User' + Math.floor(Math.random() * 10000);
            },
        },
        language: {
            type: String,
            enum: ['en', 'hi', 'ur', 'ks', 'doi'], // English, Hindi, Urdu, Kashmiri, Dogri
            default: 'en',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', userSchema);
