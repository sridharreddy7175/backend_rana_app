"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    accountType: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    isFollowing: {
        type: Boolean,
        default: false,
    },
    isUnFollowing: {
        type: Boolean,
        default: false,
    },
    followers: [{ type: ObjectId, ref: "UserModel" }],
    following: [{ type: ObjectId, ref: "UserModel" }],
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("UserModel", userSchema);
//# sourceMappingURL=user-model.js.map