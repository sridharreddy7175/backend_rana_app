import { AuthGuard } from "../utillities/auth-gaurd/auth-gaurd";
import { RoleModel } from "../models/role.model";
import { ResponseInterceptor } from "../utillities/response-interceptor";


export class RolesController {
  roleModel: typeof RoleModel;
  responseInterceptor: ResponseInterceptor;
  authGuard: AuthGuard;

  constructor() {
    this.roleModel = RoleModel;
    this.responseInterceptor = new ResponseInterceptor();
    this.authGuard = new AuthGuard();
  }

  async createReels(req, res) {
    try {
      const roleData: any = req.body;
      // save to db
      let reels = new this.roleModel({
        roleName: roleData.roleName,
        displayName: roleData.displayName,
        roleDescription: roleData.roleDescription,
        status: roleData.status,
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
    //   const result = await this.reelModel
    //     .find()
    //   return this.responseInterceptor.successResponse(
    //     req,
    //     res,
    //     200,
    //     "Data found",
    //     result
    //   );
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



