import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");

interface IReply extends Document {
  story: string;
  photos: string;
  likes: string;
  comments: string;
  postedBy: string;
  share: string;
}

const ReplySchema: Schema = new Schema(
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
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel' }],
    share: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ReplyModel = model<IReply>("ReplyModel", ReplySchema);
