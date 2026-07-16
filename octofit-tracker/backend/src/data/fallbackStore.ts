type CollectionName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';

interface FallbackStore {
  users: Array<unknown>;
  teams: Array<unknown>;
  activities: Array<unknown>;
  leaderboard: Array<unknown>;
  workouts: Array<unknown>;
}

const fallbackStore: FallbackStore = {
  users: [],
  teams: [],
  activities: [],
  leaderboard: [],
  workouts: []
};

export const getFallbackStore = () => fallbackStore;

export const resetFallbackStore = () => {
  fallbackStore.users = [];
  fallbackStore.teams = [];
  fallbackStore.activities = [];
  fallbackStore.leaderboard = [];
  fallbackStore.workouts = [];
};

export const seedFallbackStore = (data: Partial<FallbackStore>) => {
  if (data.users) fallbackStore.users = data.users;
  if (data.teams) fallbackStore.teams = data.teams;
  if (data.activities) fallbackStore.activities = data.activities;
  if (data.leaderboard) fallbackStore.leaderboard = data.leaderboard;
  if (data.workouts) fallbackStore.workouts = data.workouts;
};

export const getFallbackCollection = (collection: CollectionName) => fallbackStore[collection];
