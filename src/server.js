import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { env } from './env.js';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use(authRouter);
app.use(notesRouter);

// celebrate errors
app.use(errors());

// 404
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// запуск
const start = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server start error:', err.message);
    process.exit(1);
  }
};

start();
