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
const mongoose = require("mongoose");
const reels_comment_model_1 = require("../models/reels-comment-model");
class ReelsController {
    constructor() {
        this.reelModel = reels_model_1.ReelModel;
        this.reelsCommentModel = reels_comment_model_1.ReelsCommentModel;
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.authGuard = new auth_gaurd_1.AuthGuard();
    }
    createReels(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reelsData = req.body;
                const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                // save to db
                let reels = new this.reelModel({
                    videoUrl: reelsData.videoUrl,
                    user: userId,
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                const query = { user: userId };
                const result = yield this.reelModel
                    .find(query)
                    .sort("-createdAt")
                    .populate({
                    path: "comments",
                    model: "ReelsCommentModel",
                });
                return this.responseInterceptor.successResponse(req, res, 200, "Data found", result);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Server error", err);
            }
        });
    }
    likeReels(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myReelData = req.params.reelId;
                console.log("myPostData", myReelData);
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                const ReelObject = {
                    _id: new mongoose.Types.ObjectId(myReelData),
                };
                const reel = yield this.reelModel.findById(ReelObject);
                if (((_c = reel === null || reel === void 0 ? void 0 : reel.likes) === null || _c === void 0 ? void 0 : _c.filter((like) => like.user.toString() === loginUserId.toString()).length) > 0) {
                    this.responseInterceptor.errorResponse(res, 500, "Post has already been liked", "");
                    return;
                }
                // like the post
                reel.likes.unshift({ user: loginUserId });
                yield reel.save(); // save to db
                return this.responseInterceptor.successResponse(req, res, null, "Data found", reel);
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the Post", err);
                return;
            }
        });
    }
    unlikeReels(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myReelData = req.params.reelId;
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                const ReelObject = {
                    _id: new mongoose.Types.ObjectId(myReelData),
                };
                const reel = yield this.reelModel.findById(ReelObject);
                if (!reel) {
                    this.responseInterceptor.errorResponse(res, 400, "No Reels Found for the Reel ID", "");
                    return;
                }
                // check if the user has already been liked
                if (reel.likes.filter((like) => like.user.toString() === loginUserId.toString()).length === 0) {
                    this.responseInterceptor.errorResponse(res, 400, "Reel has not been liked", "");
                    return;
                }
                // unlike the post
                let removableIndex = reel.likes
                    .map((like) => like.user.toString())
                    .indexOf(loginUserId.toString());
                if (removableIndex !== -1) {
                    reel.likes.splice(removableIndex, 1);
                    yield reel.save(); // save to db
                    return this.responseInterceptor.successResponse(req, res, null, "Data found", reel);
                }
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the Reel", err);
                return;
            }
        });
    }
    createReelComment(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                const { reelId, content, tag } = req.body;
                console.log("==>", req.body);
                let reel = yield this.reelModel.findById(reelId);
                if (!reel) {
                    this.responseInterceptor.errorResponse(res, 400, "This reel does not exist.", "");
                }
                const newComment = new this.reelsCommentModel({
                    user: loginUserId,
                    content: content,
                    tag: tag,
                    postId: reelId,
                });
                yield this.reelModel.findOneAndUpdate({ _id: reelId }, {
                    $push: { comments: newComment._id }
                }, { new: true });
                yield newComment.save();
                return this.responseInterceptor.successResponse(req, res, null, "Comment is Created", newComment);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
}
exports.ReelsController = ReelsController;
//# sourceMappingURL=reels-controller.js.map