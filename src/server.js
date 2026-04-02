import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';
import { errors } from 'celebrate';

import notesRouter from './routes/notesRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use('/notes', notesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
