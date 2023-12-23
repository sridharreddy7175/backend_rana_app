"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "UserModel",
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "PostModel",
    },
    userName: {
        type: String
    }
}, { timestamps: true });
exports.CommentModel = (0, mongoose_1.model)("CommentModel", CommentSchema);
//# sourceMappingURL=comment-model.js.map