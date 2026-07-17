import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessLevel: string;
  goals?: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, required: true },
  goals: [{ type: String }]
}, {
  timestamps: true
});

export const User = model<IUser>('User', userSchema);
