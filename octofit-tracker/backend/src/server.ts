import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import './config/database';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';
import { getFallbackCollection, seedFallbackStore } from './data/fallbackStore';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

seedFallbackStore({
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

app.use(express.json());

const getApiBaseUrl = () => {
  if (process.env.API_URL) {
    return process.env.API_URL;
  }

  
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }

  return `http://localhost:${port}`;
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).lean();
    res.json(users.length ? users : getFallbackCollection('users'));
  } catch (error) {
    res.json(getFallbackCollection('users'));
  }
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find({}).lean();
    res.json(teams.length ? teams : getFallbackCollection('teams'));
  } catch (error) {
    res.json(getFallbackCollection('teams'));
  }
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json(activities.length ? activities : getFallbackCollection('activities'));
  } catch (error) {
    res.json(getFallbackCollection('activities'));
  }
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({}).sort({ rank: 1 }).lean();
    res.json(leaderboard.length ? leaderboard : getFallbackCollection('leaderboard'));
  } catch (error) {
    res.json(getFallbackCollection('leaderboard'));
  }
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json(workouts.length ? workouts : getFallbackCollection('workouts'));
  } catch (error) {
    res.json(getFallbackCollection('workouts'));
  }
});

const startServer = () => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
};

if (require.main === module) {
  startServer();
}

export { app, getApiBaseUrl, startServer };
