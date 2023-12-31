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
    profileUrl: { type: String },
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
    followers: [{ type: ObjectId, ref: "UserModel" }],
    following: [{ type: ObjectId, ref: "UserModel" }],
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],

    // verifytoken: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("UserModel", userSchema);
