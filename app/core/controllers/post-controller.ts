import { PostModel } from "../models/post-model";
import { ResponseInterceptor } from "../utillities/response-interceptor";
import * as mongoose from "mongoose";

export class PostController {
  responseInterceptor: ResponseInterceptor;
  postModel: typeof PostModel;
  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.postModel = PostModel;
  }

  async createPost(req, res) {
    try {
      const postData: any = req.body;
      const loginUserId = req?.user?._conditions?._id;
      if (!postData.story) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "story is Required",
          ""
        );
        return;
      }

      let photosData = req.files.map((data: any) => {
        return data?.originalname;
      });
      // save db
      let savedPosts = new this.postModel({
        user: loginUserId,
        story: postData.story,
        photos: photosData,
        share: postData.share,
      });
      savedPosts = await savedPosts.save();
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Successfully Created",
        { post_id: savedPosts._id }
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

  async allmyPosts(req, res) {
    try {
      const userId = req?.user?._conditions?._id;
      const query = { user: userId };
      const result = await this.postModel
        .find(query)
        .sort("-createdAt")
        .populate({
          path: "user",
          model: "UserModel",
          select: "name email",
        })
        .populate({
          path: "comments",
          model: "CommentModel",
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

  async likePost(req, res) {
    try {
      const myPostData = req.params.postId;
      console.log("myPostData", myPostData);
      const loginUserId = req?.user?._conditions?._id;
      const PostObject = {
        _id: new mongoose.Types.ObjectId(myPostData),
      };
      const post: any = await this.postModel.findById(PostObject);
      if (
        post?.likes?.filter(
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
      post.likes.unshift({ user: loginUserId });
      await post.save(); // save to db
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Data found",
        post
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

  async unlikePost(req, res) {
    try {
      const myPostData = req.params.postId;
      const loginUserId = req?.user?._conditions?._id;
      const PostObject = {
        _id: new mongoose.Types.ObjectId(myPostData),
      };
      const post: any = await this.postModel.findById(PostObject);
      if (!post) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "No Posts Found for the Post ID",
          ""
        );
        return;
      }
      // check if the user has already been liked
      if (
        post.likes.filter(
          (like) => like.user.toString() === loginUserId.toString()
        ).length === 0
      ) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "Post has not been liked",
          ""
        );
        return;
      }
      // unlike the post
      let removableIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(loginUserId.toString());
      if (removableIndex !== -1) {
        post.likes.splice(removableIndex, 1);
        await post.save(); // save to db
        return this.responseInterceptor.successResponse(
          req,
          res,
          null,
          "Data found",
          post
        );
      }
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

  async myPost(req, res) {
    try {
      const myPostData = req.params.id;
      if (!myPostData) {
        this.responseInterceptor.errorResponse(res, 400, "_id is Required", "");
        return;
      }
      const PostObject = {
        _id: new mongoose.Types.ObjectId(myPostData),
      };
      const response = await this.postModel.findById(PostObject);
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
        "Failed to remove the Post",
        err
      );
      return;
    }
  }
  async editPost(req,res){
    try{
      const { post_id, story, share } = req.body
      if (req.body.post_id) {
        //checking the existance user
        let post = await this.postModel.findOne({
          _id: post_id,
        });
        if (!post) {
          return this.responseInterceptor.errorResponse(
            res,
            400,
            "post does not exists"
          );
        }
        const query = {
          _id: new mongoose.Types.ObjectId(post_id),
        };
        let photosData = req.files.map((data: any) => {
          return data?.originalname;
        });
        let postData={
          story:story,
          photos:photosData,
          share:share
        }
        this.postModel
          .updateOne(query, postData)
          .then((data) => {
            return this.responseInterceptor.sendSuccess(
              res,
              "Success fully updated."
            );
          })
          .catch((err) => {
            this.responseInterceptor.errorResponse(
              res,
              400,
              "db operation failed",
              err
            );
          });
      } else {
        return this.responseInterceptor.errorResponse(
          res,
          400,
          "Bad Request",
          ""
        );
      }
    }
    catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the Post",
        err
      );
      return;
    }
  }
  async deletePost(req,res){
    try{
      const deletePostData = req.params.postId;
      if (!deletePostData) {
        this.responseInterceptor.errorResponse(res, 400, "postId is Required", "");
        return;
      }
      const deleteObject = {
        _id: new mongoose.Types.ObjectId(deletePostData),
      };
      const response = await this.postModel.deleteOne(deleteObject);
      if (response) {
        return this.responseInterceptor.sendSuccess(
          res,
          "Post Removed successfully"
        );
      } else {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "Failed to remove the post",
          response
        );
        return;
      }
    }
    catch(err){
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the Post",
        err
      );
      return
    }
  }
}
