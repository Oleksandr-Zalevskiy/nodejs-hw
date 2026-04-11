import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errors } from 'celebrate';

import authRouter from './routes/authRoutes.js'; // ⚠️ ВАЖЛИВО
import notesRouter from './routes/notesRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(authRouter);
app.use(notesRouter);

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

export const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
