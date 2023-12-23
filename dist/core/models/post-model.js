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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    photos: {
        type: Array,
        required: true,
    },
    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
        },
    ],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    share: {
        type: String,
    },
}, { timestamps: true });
exports.PostModel = (0, mongoose_1.model)("PostModel", postSchema);
//# sourceMappingURL=post-model.js.map