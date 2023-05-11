import { ResponseInterceptor } from "../core/utillities/response-interceptor";
import { UserController } from "../core/controllers/user-controller";

export class RoutingComponents {
  public responseInterceptor: ResponseInterceptor;
  userController: UserController;
  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.userController = new UserController();
  }
  /**
   *  page not found.
   */
  pageNotFound(req, res, next) {
    this.responseInterceptor.errorResponse(
      res,
      400,
      "entered URL is invalid. Please try again",
      ""
    );
  }

  CreateUser(req, res, next) {
    this.userController.createUser(req, res);
  }
  UserLogin(req,res,next){
    this.userController.userLogin(req,res)
  }

  UpdateUser(req,res,next){
    this.userController.updateUser(req,res)
  }

  UserInfo(req, res, next) {
    this.userController.userInfo(req, res);
  }

  DeleteUser(req, res, next) {
    this.userController.deleteUser(req, res);
  }
  

  AllUserDetails(req,res){
    this.userController.allUserDetails(req, res);
  }
  ForgotPassword(req,res){
    this.userController.userForgotpassword(req,res);
  }
}
