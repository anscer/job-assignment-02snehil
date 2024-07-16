import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);
