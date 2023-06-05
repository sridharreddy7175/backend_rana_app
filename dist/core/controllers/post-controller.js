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
exports.PostController = void 0;
const post_modle_1 = require("../models/post-modle");
const response_interceptor_1 = require("../utillities/response-interceptor");
const mongoose = require("mongoose");
class PostController {
    constructor() {
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.postModel = new post_modle_1.PostModel();
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = req.body;
                if (!postData.story) {
                    this.responseInterceptor.errorResponse(res, 400, 'story is Required', '');
                    return;
                }
                if (!postData.photos) {
                    this.responseInterceptor.errorResponse(res, 400, 'Photos is Required', '');
                    return;
                }
                // save db
                let savedPosts = new this.postModel({
                    story: postData.story,
                    photos: postData.photos,
                    postedBy: req.user
                });
                savedPosts = yield savedPosts.save();
                return this.responseInterceptor.successResponse(req, res, null, 'Successfully Created', { post_id: savedPosts._id });
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 400, 'Server error', err);
            }
        });
    }
    myPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myPostData = req.params.id;
                if (!myPostData) {
                    this.responseInterceptor.errorResponse(res, 400, '_id is Required', '');
                    return;
                }
                const PostObject = {
                    _id: new mongoose.Types.ObjectId(myPostData)
                };
                const response = yield this.postModel.find({ postedBy: PostObject });
                if (response) {
                    return this.responseInterceptor.sendSuccess(res, "Post Removed successfully");
                }
                else {
                    this.responseInterceptor.errorResponse(res, 400, 'Failed to remove the Post', response);
                    return;
                }
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, 'Failed to remove the Post', err);
                return;
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post-controller.js.map