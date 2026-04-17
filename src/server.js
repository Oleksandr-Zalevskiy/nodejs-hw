import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notesRoutes from './routes/notesRoutes.js'; // Має бути тут

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js'; // Має бути тут

import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();

app.use(logger); // Має бути тут
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(userRoutes);
app.use(notesRoutes); // Має бути тут

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
