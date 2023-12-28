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
const post_model_1 = require("../models/post-model");
const response_interceptor_1 = require("../utillities/response-interceptor");
const mongoose = require("mongoose");
class PostController {
    constructor() {
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.postModel = post_model_1.PostModel;
    }
    createPost(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = req.body;
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                if (!postData.story) {
                    this.responseInterceptor.errorResponse(res, 400, "story is Required", "");
                    return;
                }
                let photosData = req.files.map((data) => {
                    return data === null || data === void 0 ? void 0 : data.originalname;
                });
                console.log("photosData", photosData);
                // save db
                let savedPosts = new this.postModel({
                    user: loginUserId,
                    story: postData.story,
                    photos: photosData,
                    share: postData.share,
                });
                savedPosts = yield savedPosts.save();
                return this.responseInterceptor.successResponse(req, res, null, "Successfully Created", { post_id: savedPosts._id });
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 400, "Server error", err);
            }
        });
    }
    // async allmyPosts(req, res) {
    //   try {
    //     let currentOffset = 0;
    //     let pageLimit;
    //     if (req.query.limit) {
    //       pageLimit = Number(req.query.limit);
    //     }
    //     if (req.query.pageno) {
    //       currentOffset = pageLimit * (req.query.pageno - 1);
    //     }
    //     // Build query based on search term
    //     const searchQuery: any = {};
    //     if (req.query.search) {
    //       searchQuery.story = { $regex: req.query.search, $options: "i" }; // Case-insensitive regex search
    //     }
    //     const result = await this.postModel.find(searchQuery)
    //       .limit(pageLimit)
    //       .skip(currentOffset)
    //     return this.responseInterceptor.successResponse(
    //       req,
    //       res,
    //       200,
    //       "Data found",
    //       result
    //     );
    //   } catch (err) {
    //     return this.responseInterceptor.errorResponse(
    //       res,
    //       500,
    //       "Server error",
    //       err
    //     );
    //   }
    // }
    allmyPosts(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                const query = { user: userId };
                const result = yield this.postModel
                    .find(query)
                    .sort("-createdAt")
                    .populate({
                    path: "comments",
                    model: "CommentModel",
                });
                return this.responseInterceptor.successResponse(req, res, 200, "Data found", result);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Server error", err);
            }
        });
    }
    likePost(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myPostData = req.params.postId;
                console.log("myPostData", myPostData);
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                const PostObject = {
                    _id: new mongoose.Types.ObjectId(myPostData),
                };
                const post = yield this.postModel.findById(PostObject);
                // console.log("posyttt",post)
                // if (!post) {
                // }
                // check if the user has already been liked
                if (((_c = post === null || post === void 0 ? void 0 : post.likes) === null || _c === void 0 ? void 0 : _c.filter((like) => like.user.toString() === loginUserId.toString()).length) > 0) {
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
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                const PostObject = {
                    _id: new mongoose.Types.ObjectId(myPostData),
                };
                const post = yield this.postModel.findById(PostObject);
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
                    return this.responseInterceptor.successResponse(req, res, null, "Data found", post);
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