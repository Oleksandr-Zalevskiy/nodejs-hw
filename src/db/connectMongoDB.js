import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;

    // перевірка env (щоб одразу бачити помилку)
    if (!user || !password || !url || !db) {
      throw new Error('MongoDB env variables not set');
    }

    const connectionString = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB error:', error.message);
    process.exit(1);
  }
};
