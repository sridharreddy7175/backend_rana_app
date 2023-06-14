import { ResponseInterceptor } from "../core/utillities/response-interceptor";
import { UserController } from "../core/controllers/user-controller";
import { MovieController } from "../core/controllers/movie-controller";
import { ForgotPasswordController } from "../core/controllers/forgotPassword-controller";


export class RoutingComponents {
  public responseInterceptor: ResponseInterceptor;
  userController: UserController;
  movieController: MovieController;
  forgotPasswordController:ForgotPasswordController;

  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.userController = new UserController();
    this.movieController = new MovieController();
    this.forgotPasswordController=new ForgotPasswordController();
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
  UserLogin(req, res, next) {
    this.userController.userLogin(req, res);
  }

  UpdateUser(req, res, next) {
    this.userController.updateUser(req, res);
  }

  UserInfo(req, res, next) {
    this.userController.userInfo(req, res);
  }

  DeleteUser(req, res, next) {
    this.userController.deleteUser(req, res);
  }

  AllUserDetails(req, res) {
    this.userController.allUserDetails(req, res);
  }
  ForgotPassword(req, res) {
    this.forgotPasswordController.userForgotpassword(req, res);
  }
  resetPassword(req,res){
    this.forgotPasswordController.resetPassword(req,res)
  }
  Follow(req, res) {
    this.userController.follow(req, res);
  }
  UnFollow(req, res) {
    this.userController.unFollow(req, res);
  }

  // Movie Apis
  CreateMovie(req, res, next) {
    this.movieController.createMovie(req, res);
  }
}
