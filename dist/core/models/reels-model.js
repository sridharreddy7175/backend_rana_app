"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const ReelsSchema = new mongoose_1.Schema({
    videoUrl: {
        type: String,
        required: true,
    },
    share: {
        type: String,
    },
    tags: {
        type: Array,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
        },
    ],
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "ReelsCommentModel" },
    ],
}, { timestamps: true });
exports.ReelModel = (0, mongoose_1.model)("ReelModel", ReelsSchema);
//# sourceMappingURL=reels-model.js.map