import { Document, model, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: number;
  goal: string;
  sport?: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  members: { type: Number, required: true },
  goal: { type: String, required: true },
  sport: { type: String }
}, {
  timestamps: true
});

export const Team = model<ITeam>('Team', teamSchema);
