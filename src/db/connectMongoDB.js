import mongoose from 'mongoose';

const connectMongoDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  try {
    await mongoose.connect(mongoUrl);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  }
};

export default connectMongoDB;
