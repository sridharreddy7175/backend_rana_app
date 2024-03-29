"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    tag: Object,
    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
        },
    ],
    user: { type: mongoose.Types.ObjectId, ref: "UserModel" },
    postId: mongoose.Types.ObjectId,
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "ReplyModel" }],
}, { timestamps: true });
exports.CommentModel = (0, mongoose_1.model)("CommentModel", CommentSchema);
//# sourceMappingURL=comment-model.js.map