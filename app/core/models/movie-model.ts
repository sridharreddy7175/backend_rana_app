import  { model, Schema, Document } from "mongoose";
// const mongoose = require("mongoose");
import { genresList } from "../utillities/genresList";
import * as mongoose from 'mongoose';


interface IMovie extends Document {
  title: string;
  views: string;
  storyLine: string;
  director: string;
  type: string;
  releseDate: Date;
  genres:any;
  tags: any;
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
      // type: Array,
      type : [String],
      // required: true,
      // enum: genresList,
    },
    tags: {
      // type: Array,
      type : [String],
      // required:true
    },
    cast:{
      type : [String],
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
