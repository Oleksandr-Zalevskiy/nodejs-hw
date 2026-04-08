import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import createHttpError from 'http-errors';

import { env } from './utils/env.js';
import { connectMongoDB } from './db/initMongoConnection.js';
import { logger } from './utils/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      logger,
    }),
  );

  app.use(authRoutes);
  app.use(notesRoutes);

  app.use(errors());

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
