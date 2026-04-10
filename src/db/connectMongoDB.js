import mongoose from 'mongoose';
import { env } from '../env.js'; // Тільки дві крапки і один слеш

export const connectMongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('Error while setting up mongo connection:', e.message);
    process.exit(1);
  }
};
