import { AuthGuard } from "../utillities/auth-gaurd/auth-gaurd";
import { CommentModel } from "../models/comment-model";
import { PostModel } from "../models/post-model";
import { UserModel } from "../models/user-model";

import { ResponseInterceptor } from "../utillities/response-interceptor";
import mongoose from "mongoose";

export class CommentsController {
  commentModel: typeof CommentModel;
  responseInterceptor: ResponseInterceptor;
  authGuard: AuthGuard;
  postModel: typeof PostModel;
  userModel: typeof UserModel;

  constructor() {
    this.commentModel = CommentModel;
    this.postModel = PostModel;
    this.responseInterceptor = new ResponseInterceptor();
    this.authGuard = new AuthGuard();
    this.userModel = UserModel;
  }

  async createComment(req, res) {
    try {
      const { postId, message } = req.body;
      const loginUserId = req?.user?._conditions?._id;
      const post = await this.postModel.findById(postId);
      if (!post)
        return res.status(400).json({ msg: "This post does not exist." });

      const user = await this.userModel.findById(loginUserId);
      console.log("userId", user.name);

      const newComment = new this.commentModel({
        userId: loginUserId,
        message: message,
        postId: postId,
        userName: user.name,
      });
      await newComment.save();
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Comment is Created",
        newComment
      );
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Something went wrong",
        err
      );
    }
  }
  async allComments(req, res) {
    try {
      const comments: any = await this.commentModel.find();
      if (!comments) {
        return this.responseInterceptor.errorResponse(
          res,
          400,
          "No Comments Found",
          ""
        );
      }
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Data found",
        comments
      );
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        400,
        "Server error",
        err
      );
    }
  }
  async fetchComment(req,res){
    try {
      const myCommentData = req.params.commentId;
      if (!myCommentData) {
        this.responseInterceptor.errorResponse(res, 400, "_id is Required", "");
        return;
      }
      const CommentObject = {
        _id: new mongoose.Types.ObjectId(myCommentData),
      };
      const response = await this.commentModel.findById(CommentObject);
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Data found",
        response
      );
    } catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the Comment",
        err
      );
      return;
    }
  }
}
