import { AuthGuard } from '../utillities/auth-gaurd/auth-gaurd';
import { PostModel } from '../models/post-modle';
import { ResponseInterceptor } from "../utillities/response-interceptor";
import * as bcrypt from "bcryptjs";
import * as mongoose from 'mongoose';
import { appConfig } from "../../config/appConfig";

export class PostController {
  responseInterceptor: ResponseInterceptor;
  postModel: typeof PostModel;
  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.postModel=new PostModel();
  }

async createPost(req,res){
    try{
        const postData: any = req.body;
        if (!postData.story) {
            this.responseInterceptor.errorResponse(res, 400, 'story is Required', '');
            return;
        } 
        if (!postData.photos) {
            this.responseInterceptor.errorResponse(res, 400, 'Photos is Required', '');
            return;
        }

        // save db
        let savedPosts=new this.postModel({
          story:postData.story,
          photos:postData.photos,
          postedBy:req.user
        })
        savedPosts=await savedPosts.save()
        return this.responseInterceptor.successResponse(req, res, null, 'Successfully Created', { post_id: savedPosts._id });
    }
    catch(err){
      return this.responseInterceptor.errorResponse(res, 400, 'Server error', err);

    }
}

async myPost(req,res){
  try {
    const myPostData = req.params.id;
    if (!myPostData) {
        this.responseInterceptor.errorResponse(res, 400, '_id is Required', '');
        return;
    }
    const PostObject = {
        _id: new mongoose.Types.ObjectId(myPostData)
    };
    const response = await this.postModel.find({postedBy:PostObject});
    if (response) {
      return this.responseInterceptor.sendSuccess(res, "Post Removed successfully");
    } else {
        this.responseInterceptor.errorResponse(res, 400, 'Failed to remove the Post', response);
        return;
    }
  }
  catch(err){
    this.responseInterceptor.errorResponse(res, 400, 'Failed to remove the Post', err);
    return;
  }
}


}