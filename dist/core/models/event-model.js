"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.EventSchema = (0, mongoose_1.model)("EventModel", eventSchema);
//# sourceMappingURL=event-model.js.map