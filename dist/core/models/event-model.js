"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    ticketNo: {
        type: String,
    },
    orderNo: {
        type: String,
    },
    date: {
        type: Date,
    },
    addresses: [
        {
            city: {
                type: String,
            },
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            zipCode: {
                type: Number,
            },
            addressType: {
                type: String,
            },
        },
    ],
    description: {
        type: String,
    },
    tickets: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.EventModel = (0, mongoose_1.model)("EventModel", eventSchema);
//# sourceMappingURL=event-model.js.map