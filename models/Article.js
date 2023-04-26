import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [], //? If tags dont created, I save empty array
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: String,
  },
  //? additional settings for all fields
  {
    timestamps: true, //? when creating, add a field for each user - creation time
  }
);

export default mongoose.model('Article', ArticleSchema);
