import mongoose from 'mongoose';

const professionalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: true,
        },
        specialization: {
            type: String,
            required: [true, 'Please add a specialization'],
        },
        licenseNumber: {
            type: String,
            required: [true, 'Please add a license number'],
            select: false, // Protected field
        },
        availability: [
            {
                day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                slots: [{ type: String }], // e.g., ["10:00", "11:00"]
            }
        ],
        rating: {
            type: Number,
            default: 0,
        },
        bio: {
            type: String,
            required: [true, 'Please add a bio'],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Professional', professionalSchema);
