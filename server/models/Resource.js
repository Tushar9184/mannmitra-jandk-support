import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['Article', 'Video', 'Audio', 'Guide'],
            required: true,
        },
        language: {
            type: String,
            enum: ['en', 'hi', 'ur', 'ks', 'doi'], // English, Hindi, Urdu, Kashmiri, Dogri
            required: true,
            default: 'en',
        },
        tags: [String],
        author: {
            type: String,
            default: 'MannMitra Team',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Resource', resourceSchema);
