import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        professional: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Professional',
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['scheduled', 'completed', 'cancelled'],
            default: 'scheduled',
        },
        notes: {
            type: String, // To be encrypted at application level
            select: false, // Ensure notes are not returned by default
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Appointment', appointmentSchema);
