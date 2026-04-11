import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errors } from 'celebrate'; // Обов'язково для обробки помилок валідації

import { authRouter } from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js'; // Не забудь додати цей імпорт
import { logger } from './middleware/logger.js';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Реєструємо роутери БЕЗ префіксів /auth та /notes
app.use(authRouter);
app.use(notesRouter);

// Middleware для помилок celebrate (МАЄ бути після роутів)
app.use(errors());

// Обробник неіснуючих маршрутів (NotFound)
app.use(notFoundHandler);

// Загальний обробник помилок (ErrorHandler)
app.use(errorHandler);

// Функція запуску сервера (згідно з вимогами до структури)
export const startServer = async () => {
  try {
    // 1. Спочатку чекаємо підключення до бази
    await connectMongoDB();

    // 2. Потім запускаємо сервер
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Якщо твій index.js викликає startServer(), то залишай так.
// Якщо файл запускається напряму — можна додати виклик startServer() в кінці.
startServer();
