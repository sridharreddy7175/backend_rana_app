import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");
import { genres } from "../utillities/genres";

interface IReels extends Document {
  videoUrl: string;
  share: string;
  tags: string;
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
   tags:{
    type:String
   }
  },
  { timestamps: true }
);

export const ReelModel = model<IReels>("ReelModel", ReelsSchema);
