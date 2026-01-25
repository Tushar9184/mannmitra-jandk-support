import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import Professional from './models/Professional.js';
import Resource from './models/Resource.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Professional.deleteMany();
        await Resource.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const users = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
                alias: 'SuperAdmin',
                language: 'en',
            },
            {
                name: 'Dr. John Doe',
                email: 'doctor@example.com',
                password: hashedPassword,
                role: 'professional',
                alias: 'Dr. John',
                language: 'en',
                isVerified: true,
            },
            {
                name: 'Jane Student',
                email: 'student@example.com',
                password: hashedPassword,
                role: 'user',
                alias: 'HopefulLearner',
                language: 'en',
            },
        ]);

        const doctorUser = users[1];

        await Professional.create({
            user: doctorUser._id,
            specialization: 'Clinical Psychology',
            licenseNumber: 'PSY-12345-JK',
            availability: [
                { day: 'Mon', slots: ['10:00', '11:00'] },
                { day: 'Wed', slots: ['14:00', '15:00'] },
            ],
            rating: 4.8,
            bio: 'Experienced psychologist specializing in student anxiety and exam stress.',
        });

        await Resource.insertMany([
            {
                title: 'Managing Exam Stress',
                content: 'Exam stress is normal. Here are 5 tips to handle it...',
                category: 'Article',
                language: 'en',
                tags: ['stress', 'students', 'exams'],
            },
            {
                title: 'امتحان کے تناؤ سے نمٹنا',
                content: 'امتحان کا تناؤ معمول کی بات ہے۔ اس سے نمٹنے کے لیے یہ ہیں 5 نکات...',
                category: 'Article',
                language: 'ur',
                tags: ['stress', 'students', 'exams'],
            },
            {
                title: 'Anxiety Grounding Techniques',
                content: 'The 5-4-3-2-1 technique helps ground you during panic attacks.',
                category: 'Guide',
                language: 'en',
                tags: ['anxiety', 'panic', 'grounding'],
            },
        ]);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Professional.deleteMany();
        await Resource.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
