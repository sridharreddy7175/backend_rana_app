import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");
// import { genres } from "../utillities/genresList";

interface IReels extends Document {
  videoUrl: string;
  share: string;
  tags: any;
  user: any;
  likes: any;
  comments: any;
}

const ReelsSchema: Schema = new Schema(
  {
    videoUrl: {
      type: String,
      required: true,
    },
    share: {
      type: String,
    },
    tags: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    likes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
      },
    ],
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ReelsCommentModel" },
    ],
  },
  { timestamps: true }
);

export const ReelModel = model<IReels>("ReelModel", ReelsSchema);
