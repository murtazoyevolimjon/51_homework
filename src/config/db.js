import mongoose from 'mongoose';
import { config } from './index.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url);
    console.log('MongoDB connected');
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
