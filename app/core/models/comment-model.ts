import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");

interface IComments extends Document {
  date: string;
  message: string;
  userId: any;
  postId: any;
  userName:String;
}

const CommentSchema: Schema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "PostModel",
    },
    userName:{
      type: String
    }
  },
  { timestamps: true }
);

export const CommentModel = model<IComments>("CommentModel", CommentSchema);
