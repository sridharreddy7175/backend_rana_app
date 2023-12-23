"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const ConfigSchema = new mongoose_1.Schema({
    key: {
        type: String,
    },
    value: {
        type: Object
    }
}, { timestamps: true });
exports.ConfigModel = (0, mongoose_1.model)("ConfigModel", ConfigSchema);
//# sourceMappingURL=config-model.js.map