"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const ReplySchema = new mongoose_1.Schema({
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
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel' }],
    share: {
        type: String,
    },
}, { timestamps: true });
exports.ReplyModel = (0, mongoose_1.model)("ReplyModel", ReplySchema);
//# sourceMappingURL=reply-model.js.map