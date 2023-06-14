import  { model, Schema, Document } from "mongoose";
// const mongoose = require("mongoose");
import { genres } from "../utillities/genres";
import * as mongoose from 'mongoose';


interface IMovie extends Document {
  title: string;
  views: string;
  storyLine: string;
  director: string;
  type: string;
  releseDate: Date;
  genres:string;
  tags: string;
  cast: string;
  likes :any;
  poster:string;
  trailer:string;
  video:string;
  imbRating:string;
  language:string;
}

const movieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    storyLine: {
      type: String,
      // required: true,
    },
    director: {
      type: String,
      // required: true,
    },
    type: {
      type: String,
      // required: true,
    },
    releseDate: {
      type: Date,
      // required: true,
    },
    genres: {
      type: [String],
      // required: true,
      enum: genres,
    },
    tags: {
      type: Array,
      // required:true
    },
    cast:{
      type:Array,
      // required:true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    poster: {
      type: String,
      // required: true,
    },
    trailer: {
      type: String,
      // required: true,
    },
    video: {
      type: String,
    },
    imbRating: {
      type: String,
      // required: true,
    },
    language: {
      type: Array,
      // required: true,
    },
  },
  { timestamps: true }
);

export const MovieModel = model<IMovie>("MovieModel", movieSchema);
