"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    roleName: {
        type: String,
    },
    displayName: {
        type: String,
        required: true,
    },
    roleDescription: {
        type: mongoose.Types.ObjectId,
        ref: "UserModel",
    },
    status: {
        type: Boolean
    }
}, { timestamps: true });
exports.RoleModel = (0, mongoose_1.model)("RoleModel", RoleSchema);
//# sourceMappingURL=role.model.js.map