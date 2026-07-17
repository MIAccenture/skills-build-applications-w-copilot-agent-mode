import { Document, model, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  duration: string;
  difficulty: string;
  focus?: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  difficulty: { type: String, required: true },
  focus: { type: String }
}, {
  timestamps: true
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
