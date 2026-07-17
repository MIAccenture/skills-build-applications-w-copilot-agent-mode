"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopDatabase = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const db = mongoose_1.default.connection;
let mongoServer;
const connectToDatabase = async () => {
    if (mongoose_1.default.connection.readyState >= 1) {
        return true;
    }
    if (process.env.NODE_ENV === 'test') {
        return false;
    }
    if (process.env.MONGODB_URI) {
        try {
            await mongoose_1.default.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
                dbName: 'octofit_db'
            });
            console.log('Connected to octofit_db');
            return true;
        }
        catch (error) {
            console.warn('Primary MongoDB connection failed:', error);
            return false;
        }
    }
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db', {
            serverSelectionTimeoutMS: 5000,
            dbName: 'octofit_db'
        });
        console.log('Connected to octofit_db');
        return true;
    }
    catch (error) {
        console.warn('Primary MongoDB connection failed, falling back to in-memory MongoDB:', error);
        try {
            mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
            const fallbackUri = mongoServer.getUri();
            await mongoose_1.default.connect(fallbackUri, { dbName: 'octofit_db' });
            console.log(`Connected to in-memory MongoDB at ${fallbackUri}`);
            return true;
        }
        catch (fallbackError) {
            console.warn('In-memory MongoDB fallback failed:', fallbackError);
            return false;
        }
    }
};
exports.connectToDatabase = connectToDatabase;
const stopDatabase = async () => {
    await mongoose_1.default.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
        mongoServer = undefined;
    }
};
exports.stopDatabase = stopDatabase;
void connectToDatabase();
db.on('error', console.error.bind(console, 'connection error:'));
exports.default = db;
