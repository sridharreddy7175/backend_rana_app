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
      const loginUserId = req?.user?._conditions?._id;
      const { postId, content, tag } = req.body;
      let post = await this.postModel.findById(postId);
      if (!post) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "This post does not exist.",
          ""
        );
      }

      const newComment = new this.commentModel({
        user: loginUserId,
        content: content,
        tag: tag,
        postId: postId,
      });

      await this.postModel.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );
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
  async fetchComment(req, res) {
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

  async likeComment(req, res) {
    try {
      const myCommentData = req.params.commentId;
      const loginUserId = req?.user?._conditions?._id;
      const comment: any = await this.commentModel.findById(myCommentData);
      if (
        comment?.likes?.filter(
          (like) => like.user.toString() === loginUserId.toString()
        ).length > 0
      ) {
        this.responseInterceptor.errorResponse(
          res,
          500,
          "Comment has already been liked",
          ""
        );
        return;
      }
      comment.likes.unshift({ user: loginUserId });
      await comment.save(); // save to db
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Data found",
        comment
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

  async unlikeComment(req, res) {
    try {
      const myCommentData = req.params.commentId;
      const loginUserId = req?.user?._conditions?._id;
      const CommentObject = {
        _id: new mongoose.Types.ObjectId(myCommentData),
      };
      const comment: any = await this.commentModel.findById(CommentObject);
      if (!comment) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "No Comments Found for the Comment ID",
          ""
        );
        return;
      }
      // check if the user has already been liked
      if (
        comment.likes.filter(
          (like) => like.user.toString() === loginUserId.toString()
        ).length === 0
      ) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "Comment has not been liked",
          ""
        );
        return;
      }
      // unlike the post
      let removableIndex = comment.likes
        .map((like) => like.user.toString())
        .indexOf(loginUserId.toString());
      if (removableIndex !== -1) {
        comment.likes.splice(removableIndex, 1);
        await comment.save(); // save to db
        return this.responseInterceptor.successResponse(
          req,
          res,
          null,
          "Data found",
          comment
        );
      }
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

  async replyPostComment(req, res) {
    try {
      const { comment, replyAt, from,commentId } = req.body;
      const loginUserId = req?.user?._conditions?._id;
      if (comment === null) {
        return this.responseInterceptor.errorResponse(
          res,
          400,
          "Comment is required."
        );
      }
      const commentInfo = await this.commentModel.findById(commentId);
      commentInfo.replies.push({
        userId: loginUserId,
        comment: comment,
        replyAt: replyAt,
        from: from,
        created_At: Date.now(),
      });
      commentInfo.save();
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Data found",
        commentInfo
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
  async replyPostCommentLike(req,res){
    try{
      const myReplyData = req.params.replyId;
      const loginUserId = req?.user?._conditions?._id;
    }
    catch(err){
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
