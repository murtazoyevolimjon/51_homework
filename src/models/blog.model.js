import { model, Schema } from 'mongoose';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    published_date: {
      type: Date,
      default: Date.now(),
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Blog = model('blog', blogSchema);
