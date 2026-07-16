import { Document, model, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  name: string;
  points: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  points: { type: Number, required: true }
}, {
  timestamps: true
});

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
