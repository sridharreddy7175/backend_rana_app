import { AuthGuard } from "../utillities/auth-gaurd/auth-gaurd";
import { ReelModel } from "../models/reels-model";
import { ResponseInterceptor } from "../utillities/response-interceptor";
import * as mongoose from "mongoose";
import {ReelsCommentModel} from '../models/reels-comment-model';




export class ReelsController {
  reelModel: typeof ReelModel;
  responseInterceptor: ResponseInterceptor;
  authGuard: AuthGuard;
  reelsCommentModel: typeof ReelsCommentModel;


  constructor() {
    this.reelModel = ReelModel;
    this.reelsCommentModel=ReelsCommentModel;
    this.responseInterceptor = new ResponseInterceptor();
    this.authGuard = new AuthGuard();
  }

  async createReels(req, res) {
    try {
      const reelsData: any = req.body;
      const userId = req?.user?._conditions?._id;
      // save to db
      let reels = new this.reelModel({
        videoUrl: reelsData.videoUrl,
        user: userId,
        share: reelsData.share,
        tags: reelsData.tags,
      });
      reels = await reels.save();
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Reels Successfully Created",
        { reels_id: reels._id }
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

  async allReelDetails(req, res) {
    try {
      const userId = req?.user?._conditions?._id;
      const query = { user: userId };
      const result = await this.reelModel
        .find(query)
        .sort("-createdAt")
        .populate({
          path: "comments",
          model: "ReelsCommentModel",
        });
      return this.responseInterceptor.successResponse(
        req,
        res,
        200,
        "Data found",
        result
      );
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Server error",
        err
      );
    }
  }


  async likeReels(req, res) {
    try {
      const myReelData = req.params.reelId;
      console.log("myPostData", myReelData);
      const loginUserId = req?.user?._conditions?._id;
      const ReelObject = {
        _id: new mongoose.Types.ObjectId(myReelData),
      };
      const reel: any = await this.reelModel.findById(ReelObject);
      if (
        reel?.likes?.filter(
          (like) => like.user.toString() === loginUserId.toString()
        ).length > 0
      ) {
        this.responseInterceptor.errorResponse(
          res,
          500,
          "Post has already been liked",
          ""
        );
        return;
      }
      // like the post
      reel.likes.unshift({ user: loginUserId });
      await reel.save(); // save to db
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Data found",
        reel
      );
    } catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the Post",
        err
      );
      return;
    }
  }

  async unlikeReels(req, res) {
    try {
      const myReelData = req.params.reelId;
      const loginUserId = req?.user?._conditions?._id;
      const ReelObject = {
        _id: new mongoose.Types.ObjectId(myReelData),
      };
      const reel: any = await this.reelModel.findById(ReelObject);
      if (!reel) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "No Reels Found for the Reel ID",
          ""
        );
        return;
      }
      // check if the user has already been liked
      if (
        reel.likes.filter(
          (like) => like.user.toString() === loginUserId.toString()
        ).length === 0
      ) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "Reel has not been liked",
          ""
        );
        return;
      }
      // unlike the post
      let removableIndex = reel.likes
        .map((like) => like.user.toString())
        .indexOf(loginUserId.toString());
      if (removableIndex !== -1) {
        reel.likes.splice(removableIndex, 1);
        await reel.save(); // save to db
        return this.responseInterceptor.successResponse(
          req,
          res,
          null,
          "Data found",
          reel
        );
      }
    } catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the Reel",
        err
      );
      return;
    }
  }


  async createReelComment(req, res) {
    try {
      const loginUserId = req?.user?._conditions?._id;
      const { reelId, content, tag } = req.body;
      console.log("==>",req.body)
      let reel = await this.reelModel.findById(reelId);
      if (!reel) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "This reel does not exist.",
          ""
        );
      }
      const newComment = new this.reelsCommentModel({
        user: loginUserId,
        content: content,
        tag: tag,
        postId: reelId,
      });

      await this.reelModel.findOneAndUpdate({_id: reelId}, {
        $push: {comments: newComment._id}
    }, {new: true})
    await newComment.save()
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

}



