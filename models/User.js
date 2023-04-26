import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  //? additional settings for all fields
  {
    timestamps: true, //? when creating, add a field for each user - creation time
  }
);

export default mongoose.model('User', UserSchema);
