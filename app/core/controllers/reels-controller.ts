import { AuthGuard } from "../utillities/auth-gaurd/auth-gaurd";
import { ReelModel } from "../models/reels-model";
import { ResponseInterceptor } from "../utillities/response-interceptor";


export class ReelsController {
  reelModel: typeof ReelModel;
  responseInterceptor: ResponseInterceptor;
  authGuard: AuthGuard;

  constructor() {
    this.reelModel = ReelModel;
    this.responseInterceptor = new ResponseInterceptor();
    this.authGuard = new AuthGuard();
  }

  async createReels(req, res) {
    try {
      const reelsData: any = req.body;
      // save to db
      let reels = new this.reelModel({
        videoUrl: reelsData.videoUrl,
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
      let currentOffset = 0;
      let pageLimit: any;
      if (req.query.limit) {
        pageLimit = Number(req.query.limit);
      }
      if (req.query.pageno) {
        currentOffset = pageLimit * (req.query.pageno - 1);
      }
      const result = await this.reelModel
        .find()
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
}



