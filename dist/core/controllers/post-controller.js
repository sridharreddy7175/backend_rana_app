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
        this.postModel = post_modle_1.PostModel;
    }
    createPost(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = req.body;
                console.log("hhhhhhhh", req.files);
                console.log("lucky", req.files.originalname);
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                console.log("loginUserId", loginUserId);
                if (!postData.story) {
                    this.responseInterceptor.errorResponse(res, 400, "story is Required", "");
                    return;
                }
                let photosData = req.files.map((data) => {
                    return data.originalname;
                });
                console.log("photosData", photosData);
                // save db
                let savedPosts = new this.postModel({
                    user: loginUserId,
                    story: postData.story,
                    photos: photosData,
                    share: postData.share,
                    // postedBy:req.user
                });
                savedPosts = yield savedPosts.save();
                return this.responseInterceptor.successResponse(req, res, null, "Successfully Created", { post_id: savedPosts._id });
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 400, "Server error", err);
            }
        });
    }
    allmyPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.postModel.find();
                console.log("posts", posts);
                if (!posts) {
                    return this.responseInterceptor.errorResponse(res, 400, "No Posts Found", "");
                }
                return this.responseInterceptor.successResponse(req, res, null, "Data found", posts);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 400, "Server error", err);
            }
        });
    }
    likePost(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myPostData = req.params.postId;
                console.log("myPOstdata", myPostData);
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                console.log("loginUserId", loginUserId);
                const PostObject = {
                    _id: new mongoose.Types.ObjectId(myPostData),
                };
                const post = yield this.postModel.findById(PostObject);
                console.log("myPostData", post);
                if (!post) {
                }
                // check if the user has already been liked
                if (post.likes.filter((like) => like.user.toString() === loginUserId.toString()).length > 0) {
                    this.responseInterceptor.errorResponse(res, 500, "Post has already been liked", "");
                    return;
                }
                // like the post
                post.likes.unshift({ user: loginUserId });
                yield post.save(); // save to db
                return this.responseInterceptor.successResponse(req, res, null, "Data found", post);
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the Post", err);
                return;
            }
        });
    }
    unlikePost(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myPostData = req.params.postId;
                console.log("myPOstdata", myPostData);
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                console.log("loginUserId", loginUserId);
                const PostObject = {
                    _id: new mongoose.Types.ObjectId(myPostData),
                };
                const post = yield this.postModel.findById(PostObject);
                console.log("myPostData", post);
                if (!post) {
                    this.responseInterceptor.errorResponse(res, 400, "No Posts Found for the Post ID", "");
                    return;
                }
                // check if the user has already been liked
                if (post.likes.filter((like) => like.user.toString() === loginUserId.toString()).length === 0) {
                    this.responseInterceptor.errorResponse(res, 400, "Post has not been liked", "");
                    return;
                }
                // unlike the post
                let removableIndex = post.likes
                    .map((like) => like.user.toString())
                    .indexOf(loginUserId.toString());
                if (removableIndex !== -1) {
                    post.likes.splice(removableIndex, 1);
                    yield post.save(); // save to db
                    res.status(200).json({
                        post: post,
                    });
                }
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the Post", err);
                return;
            }
        });
    }
    myPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myPostData = req.params.id;
                console.log("myPostData", myPostData);
                if (!myPostData) {
                    this.responseInterceptor.errorResponse(res, 400, "_id is Required", "");
                    return;
                }
                const PostObject = {
                    _id: new mongoose.Types.ObjectId(myPostData),
                };
                const response = yield this.postModel.findById(PostObject);
                return this.responseInterceptor.successResponse(req, res, null, "Data found", response);
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the Post", err);
                return;
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post-controller.js.map