import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const PORT = Number(process.env.PORT) || 3000;

export const startServer = async () => {
  const app = express();

  // Підключення до MongoDB перед стартом сервера
  await connectMongoDB();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Logger
  app.use(logger);

  // Routes
  app.use('/auth', authRoutes);
  app.use('/notes', notesRoutes);

  // Celebrate errors
  app.use(errors());

  // Not found handler
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
