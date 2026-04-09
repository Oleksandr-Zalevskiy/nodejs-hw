import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  const user = process.env.MONGODB_USER;
  const pwd = process.env.MONGODB_PASSWORD;
  const url = process.env.MONGODB_URL;
  const db = process.env.MONGODB_DB;

  console.log('MongoDB env:', {
    user,
    pwd: pwd ? 'SET' : 'NOT SET',
    url,
    db,
  });

  if (!user || !pwd || !url || !db) {
    throw new Error('MongoDB environment variables are not fully set');
  }

  const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('Error while setting up Mongo connection:', e.message);
    throw e; // не падаємо process.exit(1) одразу
  }
};
