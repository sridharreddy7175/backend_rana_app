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
    photos: {
      type: String,
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    postedBy: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    share: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PostModel = model<any>("PostModel", postSchema);
