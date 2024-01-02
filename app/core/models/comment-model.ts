import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");

interface IComments extends Document {
  content: string;
  tag: object;
  reply: any;
  likes: any;
  postId: any;
  user: any;
  replies:any;
}

const CommentSchema: Schema = new Schema(
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
    postId: mongoose.Types.ObjectId,
    replies: [
      {
        rid: { type: mongoose.Schema.Types.ObjectId },
        userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
        from: { type: String },
        replyAt: { type: String },
        comment: { type: String },
        created_At: { type: Date, default: Date.now() },
        updated_At: { type: Date, default: Date.now() },
        likes: [
          {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const CommentModel = model<IComments>("CommentModel", CommentSchema);
