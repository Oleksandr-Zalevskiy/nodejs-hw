import mongoose from 'mongoose';
import { env } from '../env.js';

export const connectMongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    // Формуємо рядок підключення.
    // Переконайтеся, що в MongoDB Atlas дозволено доступ з усіх IP (0.0.0.0/0)
    const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('Error while setting up mongo connection', e.message);
    // Важливо: якщо база не підключилася, ми зупиняємо процес,
    // щоб Render міг перезапустити додаток
    process.exit(1);
  }
};
