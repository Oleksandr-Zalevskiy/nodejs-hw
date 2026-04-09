import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const pwd = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;

    if (!user || !pwd || !url || !db) {
      throw new Error('MongoDB environment variables not set');
    }

    const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);
    console.log('MongoDB connected successfully!');
  } catch (e) {
    console.error('Error connecting to MongoDB:', e.message);
    process.exit(1);
  }
};
