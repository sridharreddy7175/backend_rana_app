import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  accountType: boolean;
  phone: string;
  isFollowing: string;
  isUnFollowing: string;
  profileUrl:string;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    activeStatus: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },
    profileUrl:{
      type: String,
      default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
  },
    followers: [{ type: ObjectId, ref: "UserModel" }],
    following: [{ type: ObjectId, ref: "UserModel" }],
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("UserModel", userSchema);
