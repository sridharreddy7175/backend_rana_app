"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    heroName: {
        type: String,
        required: true,
    },
    eventPoster: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    description: {
        type: Boolean,
        default: false,
    },
    tickets: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.EventSchema = (0, mongoose_1.model)("EventModel", eventSchema);
//# sourceMappingURL=event-model.js.map