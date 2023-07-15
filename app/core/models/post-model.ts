import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");

interface IPost extends Document {
  story: string;
  photos: string;
  likes: string;
  comments: string;
  postedBy: string;
  share: string;
}

const postSchema: Schema = new Schema(
  {
    story: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    photos: {
      type: Array,
      required: true,
    },
    likes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
      },
    ],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    share: {
      type: String,
    },
  },
  { timestamps: true }
);

export const PostModel = model<IPost>("PostModel", postSchema);
