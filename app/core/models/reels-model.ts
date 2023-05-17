import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");
import { genres } from "../utillities/genres";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  accountType: boolean;
  phone: string;
}

const ReelsSchema: Schema = new Schema(
  {
   videoUrl:{
    type:String,
    required:true
   },
   like:{
    type:String,
   },
   share:{
    type:String,
   },
   comment:{
    type:String,
   },
  //  userProfile:{
  //   type:String,
  //  },
  //  follwing:{
  //   type:String
  //  },
   tags:{
    type:String
   }
  },
  { timestamps: true }
);

export const MovieModel = model<IUser>("MovieModel", ReelsSchema);
