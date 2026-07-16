"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFallbackCollection = exports.seedFallbackStore = exports.resetFallbackStore = exports.getFallbackStore = void 0;
const fallbackStore = {
    users: [],
    teams: [],
    activities: [],
    leaderboard: [],
    workouts: []
};
const getFallbackStore = () => fallbackStore;
exports.getFallbackStore = getFallbackStore;
const resetFallbackStore = () => {
    fallbackStore.users = [];
    fallbackStore.teams = [];
    fallbackStore.activities = [];
    fallbackStore.leaderboard = [];
    fallbackStore.workouts = [];
};
exports.resetFallbackStore = resetFallbackStore;
const seedFallbackStore = (data) => {
    if (data.users)
        fallbackStore.users = data.users;
    if (data.teams)
        fallbackStore.teams = data.teams;
    if (data.activities)
        fallbackStore.activities = data.activities;
    if (data.leaderboard)
        fallbackStore.leaderboard = data.leaderboard;
    if (data.workouts)
        fallbackStore.workouts = data.workouts;
};
exports.seedFallbackStore = seedFallbackStore;
const getFallbackCollection = (collection) => fallbackStore[collection];
exports.getFallbackCollection = getFallbackCollection;
