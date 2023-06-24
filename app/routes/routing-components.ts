import { ResponseInterceptor } from "../core/utillities/response-interceptor";
import { UserController } from "../core/controllers/user-controller";
import { MovieController } from "../core/controllers/movie-controller";
import { ForgotPasswordController } from "../core/controllers/forgotPassword-controller";
import { ReelsController } from "../core/controllers/reels-controller";
import { PostController } from "../core/controllers/post-controller";




export class RoutingComponents {
  public responseInterceptor: ResponseInterceptor;
  userController: UserController;
  movieController: MovieController;
  forgotPasswordController:ForgotPasswordController;
  reelsControler:ReelsController;
  postController:PostController;

  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.userController = new UserController();
    this.movieController = new MovieController();
    this.forgotPasswordController=new ForgotPasswordController();
    this.reelsControler=new ReelsController();
    this.postController=new PostController();
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

  AllMoviesLists(req,res,next){
    this.movieController.moviesList(req, res);
  }
  FetchMovie(req,res,next){
   this.movieController.fetchMovie(req,res)
  }
  // Reeels Apis

  CreateReels(req,res,next){
    this.reelsControler.createReels(req,res)
  }
  AllReelDetails(req,res,next){
    this.reelsControler.allReelDetails(req,res)
  }

  // Posts Apis
 CreatePost(req,res,next){
  this.postController.createPost(req,res)
 }
 AllMyPosts(req,res,next){
  this.postController.allmyPosts(req,res)
 }
 MyPost(req,res,next){
  this.postController.myPost(req,res)
 }
 LikePost(req,res,next){
  this.postController.likePost(req,res)
 }
 UnLikePost(req,res,next){
  this.postController.unlikePost(req,res)
 }

}
