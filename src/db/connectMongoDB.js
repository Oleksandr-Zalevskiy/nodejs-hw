import mongoose from 'mongoose';
import { env } from '../env.js'; // Дві крапки - виходимо з db у src

export const connectMongoDB = async () => {
  try {
    // Ці назви мають бути ТАКИМИ Ж, як Key на Render
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('MongoDB connection error:', e.message);
    process.exit(1);
  }
};
