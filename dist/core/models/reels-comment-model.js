"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelsCommentModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const ReelsCommentSchema = new mongoose_1.Schema({
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
    reelId: mongoose.Types.ObjectId,
    // reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "ReplyModel" }],
}, { timestamps: true });
exports.ReelsCommentModel = (0, mongoose_1.model)("ReelsCommentModel", ReelsCommentSchema);
//# sourceMappingURL=reels-comment-model.js.map