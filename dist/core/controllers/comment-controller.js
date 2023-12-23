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
exports.CommentsController = void 0;
const auth_gaurd_1 = require("../utillities/auth-gaurd/auth-gaurd");
const comment_model_1 = require("../models/comment-model");
const post_model_1 = require("../models/post-model");
const user_model_1 = require("../models/user-model");
const response_interceptor_1 = require("../utillities/response-interceptor");
const mongoose_1 = require("mongoose");
class CommentsController {
    constructor() {
        this.commentModel = comment_model_1.CommentModel;
        this.postModel = post_model_1.PostModel;
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.authGuard = new auth_gaurd_1.AuthGuard();
        this.userModel = user_model_1.UserModel;
    }
    createComment(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId, message } = req.body;
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                const post = yield this.postModel.findById(postId);
                if (!post)
                    return res.status(400).json({ msg: "This post does not exist." });
                const user = yield this.userModel.findById(loginUserId);
                console.log("userId", user.name);
                const newComment = new this.commentModel({
                    userId: loginUserId,
                    message: message,
                    postId: postId,
                    userName: user.name,
                });
                yield newComment.save();
                return this.responseInterceptor.successResponse(req, res, null, "Comment is Created", newComment);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
    allComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.commentModel.find();
                if (!comments) {
                    return this.responseInterceptor.errorResponse(res, 400, "No Comments Found", "");
                }
                return this.responseInterceptor.successResponse(req, res, null, "Data found", comments);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 400, "Server error", err);
            }
        });
    }
    fetchComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myCommentData = req.params.commentId;
                if (!myCommentData) {
                    this.responseInterceptor.errorResponse(res, 400, "_id is Required", "");
                    return;
                }
                const CommentObject = {
                    _id: new mongoose_1.default.Types.ObjectId(myCommentData),
                };
                const response = yield this.commentModel.findById(CommentObject);
                return this.responseInterceptor.successResponse(req, res, null, "Data found", response);
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the Comment", err);
                return;
            }
        });
    }
}
exports.CommentsController = CommentsController;
//# sourceMappingURL=comment-controller.js.map