"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const ReelsSchema = new mongoose_1.Schema({
    videoUrl: {
        type: String,
        required: true
    },
    like: {
        type: String,
    },
    share: {
        type: String,
    },
    comment: {
        type: String,
    },
    //  userProfile:{
    //   type:String,
    //  },
    //  follwing:{
    //   type:String
    //  },
    tags: {
        type: String
    }
}, { timestamps: true });
exports.MovieModel = (0, mongoose_1.model)("MovieModel", ReelsSchema);
//# sourceMappingURL=reels-model.js.map