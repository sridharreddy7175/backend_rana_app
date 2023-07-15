"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const movieSchema = new mongoose_1.Schema({
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
        type: [String],
        // required: true,
        // enum: genresList,
    },
    tags: {
        // type: Array,
        type: [String],
        // required:true
    },
    cast: {
        type: [String],
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
}, { timestamps: true });
exports.MovieModel = (0, mongoose_1.model)("MovieModel", movieSchema);
//# sourceMappingURL=movie-model.js.map