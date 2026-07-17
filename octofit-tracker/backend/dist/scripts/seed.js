"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const database_1 = require("../config/database");
const fallbackStore_1 = require("../data/fallbackStore");
dotenv_1.default.config();
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        const connected = await (0, database_1.connectToDatabase)();
        console.log(connected ? 'Connected to octofit_db or an in-memory MongoDB fallback' : 'Using the fallback data store');
        (0, fallbackStore_1.resetFallbackStore)();
        const seedPayload = {
            users: [
                {
                    name: 'Ada Lovelace',
                    email: 'ada@example.com',
                    fitnessLevel: 'advanced',
                    goals: ['Run a half marathon', 'Improve mobility']
                },
                {
                    name: 'Grace Hopper',
                    email: 'grace@example.com',
                    fitnessLevel: 'intermediate',
                    goals: ['Complete 3 strength sessions', 'Stay consistent']
                },
                {
                    name: 'Katherine Johnson',
                    email: 'katherine@example.com',
                    fitnessLevel: 'beginner',
                    goals: ['Walk 10k steps daily']
                }
            ],
            teams: [
                {
                    name: 'Rocket Squad',
                    members: 8,
                    goal: 'Complete 10k steps daily',
                    sport: 'running'
                },
                {
                    name: 'Velocity Crew',
                    members: 6,
                    goal: 'Train three times a week',
                    sport: 'crossfit'
                }
            ],
            activities: [
                { type: 'Run', duration: '30m', calories: 320 },
                { type: 'Yoga', duration: '20m', calories: 160 },
                { type: 'Cycling', duration: '45m', calories: 410 }
            ],
            leaderboard: [
                { rank: 1, name: 'Ada Lovelace', points: 980 },
                { rank: 2, name: 'Grace Hopper', points: 910 },
                { rank: 3, name: 'Katherine Johnson', points: 860 }
            ],
            workouts: [
                { title: 'HIIT Sprint', duration: '20 min', difficulty: 'hard', focus: 'cardio' },
                { title: 'Mobility Flow', duration: '15 min', difficulty: 'easy', focus: 'mobility' },
                { title: 'Strength Builder', duration: '25 min', difficulty: 'moderate', focus: 'strength' }
            ]
        };
        if (connected) {
            try {
                await Promise.all([
                    user_1.User.deleteMany({}),
                    team_1.Team.deleteMany({}),
                    activity_1.Activity.deleteMany({}),
                    leaderboard_1.Leaderboard.deleteMany({}),
                    workout_1.Workout.deleteMany({})
                ]);
                const users = await user_1.User.insertMany(seedPayload.users);
                const teams = await team_1.Team.insertMany(seedPayload.teams);
                const activities = await activity_1.Activity.insertMany(seedPayload.activities);
                const leaderboard = await leaderboard_1.Leaderboard.insertMany(seedPayload.leaderboard);
                const workouts = await workout_1.Workout.insertMany(seedPayload.workouts);
                (0, fallbackStore_1.seedFallbackStore)({
                    users: users.map((user) => user.toObject()),
                    teams: teams.map((team) => team.toObject()),
                    activities: activities.map((activity) => activity.toObject()),
                    leaderboard: leaderboard.map((entry) => entry.toObject()),
                    workouts: workouts.map((workout) => workout.toObject())
                });
            }
            catch (error) {
                console.warn('MongoDB write failed, using fallback store instead:', error);
            }
        }
        (0, fallbackStore_1.seedFallbackStore)({
            users: seedPayload.users,
            teams: seedPayload.teams,
            activities: seedPayload.activities,
            leaderboard: seedPayload.leaderboard,
            workouts: seedPayload.workouts
        });
        console.log('Database seeding complete');
        await (0, database_1.stopDatabase)();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
