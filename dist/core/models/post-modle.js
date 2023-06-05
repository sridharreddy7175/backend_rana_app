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
    photos: {
        type: String,
        required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            text: String,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    share: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.PostModel = (0, mongoose_1.model)("PostModel", postSchema);
//# sourceMappingURL=post-modle.js.map