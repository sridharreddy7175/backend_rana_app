"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelsController = void 0;
const auth_gaurd_1 = require("../utillities/auth-gaurd/auth-gaurd");
const reels_model_1 = require("../models/reels-model");
const response_interceptor_1 = require("../utillities/response-interceptor");
class ReelsController {
    constructor() {
        this.reelModel = reels_model_1.ReelModel;
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.authGuard = new auth_gaurd_1.AuthGuard();
    }
    createReels(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reelsData = req.body;
                // save to db
                let reels = new this.reelModel({
                    videoUrl: reelsData.videoUrl,
                    share: reelsData.share,
                    tags: reelsData.tags,
                });
                reels = yield reels.save();
                return this.responseInterceptor.successResponse(req, res, null, "Reels Successfully Created", { reels_id: reels._id });
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
    allReelDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentOffset = 0;
                let pageLimit;
                if (req.query.limit) {
                    pageLimit = Number(req.query.limit);
                }
                if (req.query.pageno) {
                    currentOffset = pageLimit * (req.query.pageno - 1);
                }
                const result = yield this.reelModel
                    .find();
                return this.responseInterceptor.successResponse(req, res, 200, "Data found", result);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Server error", err);
            }
        });
    }
}
exports.ReelsController = ReelsController;
//# sourceMappingURL=reels-controller.js.map