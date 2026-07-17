"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.getApiBaseUrl = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const fallbackStore_1 = require("./data/fallbackStore");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT || 8000);
(0, fallbackStore_1.seedFallbackStore)({
    users: [
        { name: 'Ada Lovelace', email: 'ada@example.com', fitnessLevel: 'advanced' },
        { name: 'Grace Hopper', email: 'grace@example.com', fitnessLevel: 'intermediate' }
    ],
    teams: [
        { name: 'Rocket Squad', members: 8, goal: 'Complete 10k steps daily' },
        { name: 'Velocity Crew', members: 6, goal: 'Train three times a week' }
    ],
    activities: [
        { type: 'Run', duration: '30m', calories: 320 },
        { type: 'Yoga', duration: '20m', calories: 160 }
    ],
    leaderboard: [
        { rank: 1, name: 'Ada Lovelace', points: 980 },
        { rank: 2, name: 'Grace Hopper', points: 910 }
    ],
    workouts: [
        { title: 'HIIT Sprint', duration: '20 min', difficulty: 'hard' },
        { title: 'Mobility Flow', duration: '15 min', difficulty: 'easy' }
    ]
});
app.use(express_1.default.json());
const getApiBaseUrl = () => {
    if (process.env.API_URL) {
        return process.env.API_URL;
    }
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:${port}`;
};
exports.getApiBaseUrl = getApiBaseUrl;
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await user_1.User.find({}).lean();
        res.json(users.length ? users : (0, fallbackStore_1.getFallbackCollection)('users'));
    }
    catch (error) {
        res.json((0, fallbackStore_1.getFallbackCollection)('users'));
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await team_1.Team.find({}).lean();
        res.json(teams.length ? teams : (0, fallbackStore_1.getFallbackCollection)('teams'));
    }
    catch (error) {
        res.json((0, fallbackStore_1.getFallbackCollection)('teams'));
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await activity_1.Activity.find({}).lean();
        res.json(activities.length ? activities : (0, fallbackStore_1.getFallbackCollection)('activities'));
    }
    catch (error) {
        res.json((0, fallbackStore_1.getFallbackCollection)('activities'));
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await leaderboard_1.Leaderboard.find({}).sort({ rank: 1 }).lean();
        res.json(leaderboard.length ? leaderboard : (0, fallbackStore_1.getFallbackCollection)('leaderboard'));
    }
    catch (error) {
        res.json((0, fallbackStore_1.getFallbackCollection)('leaderboard'));
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await workout_1.Workout.find({}).lean();
        res.json(workouts.length ? workouts : (0, fallbackStore_1.getFallbackCollection)('workouts'));
    }
    catch (error) {
        res.json((0, fallbackStore_1.getFallbackCollection)('workouts'));
    }
});
const startServer = () => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`OctoFit backend listening on port ${port}`);
        console.log(`API base URL: ${getApiBaseUrl()}`);
    });
};
exports.startServer = startServer;
if (require.main === module) {
    startServer();
}
