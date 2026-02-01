import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import app from './app.js';

const port = process.env.PORT || 5000;

connectDB();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('join_room', (userId) => {
        socket.join(userId);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
});

httpServer.listen(port, () => console.log(`Server started on port ${port}`));
