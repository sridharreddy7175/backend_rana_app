import { ResponseInterceptor } from "../core/utillities/response-interceptor";
import { UserController } from "../core/controllers/user-controller";
import { MovieController } from "../core/controllers/movie-controller";
import { ForgotPasswordController } from "../core/controllers/forgotPassword-controller";
import { ReelsController } from "../core/controllers/reels-controller";
import { PostController } from "../core/controllers/post-controller";
import {CommentsController} from '../core/controllers/comment-controller';
import {EventController} from '../core/controllers/event-controller';



export class RoutingComponents {
  public responseInterceptor: ResponseInterceptor;
  userController: UserController;
  movieController: MovieController;
  forgotPasswordController:ForgotPasswordController;
  reelsControler:ReelsController;
  postController:PostController;
  commentsController:CommentsController;
  eventController:EventController;

  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
    this.userController = new UserController();
    this.movieController = new MovieController();
    this.forgotPasswordController=new ForgotPasswordController();
    this.reelsControler=new ReelsController();
    this.postController=new PostController();
    this.commentsController=new CommentsController();
    this.eventController=new EventController();

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

  SuggestionsUser(req,res){
    this.userController.suggestionsUser(req,res)
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
  ActiveUser(req,res){
    this.userController.activeUser(req, res);

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
  LikeReels(req,res){
    this.reelsControler.likeReels(req,res)
  }
  UnLikeReels(req,res){
    this.reelsControler.unlikeReels(req,res)
  }
  CreateReelComment(req,res){
    this.reelsControler.createReelComment(req,res)

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
 CreateComment(req,res,next){
  this.commentsController.createComment(req,res)
 }
 AllComments(req,res){
  this.commentsController.allComments(req,res)
 }
 FetchComment(req,res){
  this.commentsController.fetchComment(req,res)
 }
 LikeComment(req,res){
  this.commentsController.likeComment(req,res)
 }
 UnLikeComment(req,res){
  this.commentsController.unlikeComment(req,res)

 }
 ReplyPostComment(req,res){
  this.commentsController.replyPostComment(req,res)
 }
 EditPost(req,res){
  this.postController.editPost(req,res)
 }
 DeletePost(req,res){
  this.postController.deletePost(req,res)
 }

 // Events Apis
 CreateEvent(req,res){
  this.eventController.createEvent(req,res)
 }
}
