import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';
import { connectToDatabase, stopDatabase } from '../config/database';
import { resetFallbackStore, seedFallbackStore } from '../data/fallbackStore';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    const connected = await connectToDatabase();
    console.log(connected ? 'Connected to octofit_db or an in-memory MongoDB fallback' : 'Using the fallback data store');

    resetFallbackStore();

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
          User.deleteMany({}),
          Team.deleteMany({}),
          Activity.deleteMany({}),
          Leaderboard.deleteMany({}),
          Workout.deleteMany({})
        ]);

        const users = await User.insertMany(seedPayload.users);
        const teams = await Team.insertMany(seedPayload.teams);
        const activities = await Activity.insertMany(seedPayload.activities);
        const leaderboard = await Leaderboard.insertMany(seedPayload.leaderboard);
        const workouts = await Workout.insertMany(seedPayload.workouts);

        seedFallbackStore({
          users: users.map((user) => user.toObject()),
          teams: teams.map((team) => team.toObject()),
          activities: activities.map((activity) => activity.toObject()),
          leaderboard: leaderboard.map((entry) => entry.toObject()),
          workouts: workouts.map((workout) => workout.toObject())
        });
      } catch (error) {
        console.warn('MongoDB write failed, using fallback store instead:', error);
      }
    }

    seedFallbackStore({
      users: seedPayload.users,
      teams: seedPayload.teams,
      activities: seedPayload.activities,
      leaderboard: seedPayload.leaderboard,
      workouts: seedPayload.workouts
    });

    console.log('Database seeding complete');
    await stopDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
