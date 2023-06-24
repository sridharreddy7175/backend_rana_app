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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    photos: {
      type: Array,
      required: true,
    },
    likes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        text: { type: String, required: true },
        name: { type: String, required: true },
        avatar: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
    share: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

export const PostModel = model<IPost>("PostModel", postSchema);
