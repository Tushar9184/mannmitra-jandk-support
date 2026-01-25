import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Error Middleware
app.use(errorMiddleware);

export default app;
