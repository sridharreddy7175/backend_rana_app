"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = require("mongoose");
// const mongoose = require("mongoose");
const genres_1 = require("../utillities/genres");
const mongoose = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    views: {
        type: String,
    },
    storyLine: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    releseDate: {
        type: Date,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
        enum: genres_1.genres,
    },
    tags: {
        type: Array,
        required: true
    },
    cast: {
        type: Array,
        required: true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    poster: {
        type: String,
        required: true,
    },
    trailer: {
        type: String,
        required: true,
    },
    video: {
        type: String,
    },
    imbRating: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.MovieModel = (0, mongoose_1.model)("MovieModel", movieSchema);
//# sourceMappingURL=movie-model.js.map