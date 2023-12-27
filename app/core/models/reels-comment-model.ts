import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");

interface IReelsComments extends Document {
  content: string;
  tag: object;
  reply: any;
  likes: any;
  postId: any;
  user: any;
}

const ReelsCommentSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: Object,
    likes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
      },
    ],
    user: { type: mongoose.Types.ObjectId, ref: "UserModel" },
    reelId: mongoose.Types.ObjectId,
    // reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "ReplyModel" }],
  },
  { timestamps: true }
);

export const ReelsCommentModel = model<IReelsComments>("ReelsCommentModel", ReelsCommentSchema);
