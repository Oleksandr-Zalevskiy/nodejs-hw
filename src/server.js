import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { env } from './utils/env.js';
import { connectMongoDB } from './db/connectMongoDB.js'; // Змінено назву файлу
import { logger } from './middleware/logger.js'; // Іменований імпорт та назва папки
import { notFoundHandler } from './middleware/notFoundHandler.js'; // Назва папки
import { errorHandler } from './middleware/errorHandler.js'; // Назва папки

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = async () => {
  const app = express();

  // 1. Очікуємо підключення до MongoDB ПЕРЕД запуском сервера (вимога ментора)
  await connectMongoDB();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // Використовуємо кастомний logger напряму (без pino-http, якщо так просить специфікація)
  app.use(logger);

  app.use(authRoutes);
  app.use(notesRoutes);

  // Обробка помилок celebrate
  app.use(errors());

  // Обробник notFound без '*' (просто як middleware)
  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
