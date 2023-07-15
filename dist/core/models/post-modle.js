"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const postSchema = new mongoose_1.Schema({
    story: {
        type: String,
        required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    photos: {
        type: Array,
        required: true,
    },
    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        },
    ],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
            text: { type: String, required: true },
            name: { type: String, required: true },
            avatar: { type: String, required: true },
            date: { type: String, required: true },
        },
    ],
    share: {
        type: String,
        // required: true,
    },
}, { timestamps: true });
exports.PostModel = (0, mongoose_1.model)("PostModel", postSchema);
//# sourceMappingURL=post-modle.js.map