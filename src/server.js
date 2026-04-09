import express from 'express';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notesRouter } from './routes/notesRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/notes', notesRouter);
app.use('/auth', authRouter);

// Not found middleware
app.use(notFoundHandler);

// Запуск сервера після підключення до MongoDB
const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.error('Failed to start server:', e);
  }
};

startServer();
