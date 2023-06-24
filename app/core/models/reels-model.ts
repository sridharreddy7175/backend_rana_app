import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");
// import { genres } from "../utillities/genresList";

interface IReels extends Document {
  videoUrl: string;
  share: string;
  tags: any;
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
    type:Array
   }
  },
  { timestamps: true }
);

export const ReelModel = model<IReels>("ReelModel", ReelsSchema);
