import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const db = mongoose.connection;
let mongoServer: MongoMemoryServer | undefined;

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return true;
  }

  if (process.env.NODE_ENV === 'test') {
    return false;
  }

  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        dbName: 'octofit_db'
      });
      console.log('Connected to octofit_db');
      return true;
    } catch (error) {
      console.warn('Primary MongoDB connection failed:', error);
      return false;
    }
  }

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db', {
      serverSelectionTimeoutMS: 5000,
      dbName: 'octofit_db'
    });
    console.log('Connected to octofit_db');
    return true;
  } catch (error) {
    console.warn('Primary MongoDB connection failed, falling back to in-memory MongoDB:', error);
    try {
      mongoServer = await MongoMemoryServer.create();
      const fallbackUri = mongoServer.getUri();
      await mongoose.connect(fallbackUri, { dbName: 'octofit_db' });
      console.log(`Connected to in-memory MongoDB at ${fallbackUri}`);
      return true;
    } catch (fallbackError) {
      console.warn('In-memory MongoDB fallback failed:', fallbackError);
      return false;
    }
  }
};

const stopDatabase = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = undefined;
  }
};

void connectToDatabase();
db.on('error', console.error.bind(console, 'connection error:'));

export { connectToDatabase, stopDatabase };
export default db;
