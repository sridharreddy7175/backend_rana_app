"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingComponents = void 0;
const response_interceptor_1 = require("../core/utillities/response-interceptor");
const user_controller_1 = require("../core/controllers/user-controller");
const movie_controller_1 = require("../core/controllers/movie-controller");
const forgotPassword_controller_1 = require("../core/controllers/forgotPassword-controller");
const reels_controller_1 = require("../core/controllers/reels-controller");
const post_controller_1 = require("../core/controllers/post-controller");
const comment_controller_1 = require("../core/controllers/comment-controller");
class RoutingComponents {
    constructor() {
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.userController = new user_controller_1.UserController();
        this.movieController = new movie_controller_1.MovieController();
        this.forgotPasswordController = new forgotPassword_controller_1.ForgotPasswordController();
        this.reelsControler = new reels_controller_1.ReelsController();
        this.postController = new post_controller_1.PostController();
        this.commentsController = new comment_controller_1.CommentsController();
    }
    /**
     *  page not found.
     */
    pageNotFound(req, res, next) {
        this.responseInterceptor.errorResponse(res, 400, "entered URL is invalid. Please try again", "");
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
    resetPassword(req, res) {
        this.forgotPasswordController.resetPassword(req, res);
    }
    Follow(req, res) {
        this.userController.follow(req, res);
    }
    UnFollow(req, res) {
        this.userController.unFollow(req, res);
    }
    ActiveUser(req, res) {
        this.userController.activeUser(req, res);
    }
    // Movie Apis
    CreateMovie(req, res, next) {
        this.movieController.createMovie(req, res);
    }
    AllMoviesLists(req, res, next) {
        this.movieController.moviesList(req, res);
    }
    FetchMovie(req, res, next) {
        this.movieController.fetchMovie(req, res);
    }
    // Reeels Apis
    CreateReels(req, res, next) {
        this.reelsControler.createReels(req, res);
    }
    AllReelDetails(req, res, next) {
        this.reelsControler.allReelDetails(req, res);
    }
    // Posts Apis
    CreatePost(req, res, next) {
        this.postController.createPost(req, res);
    }
    AllMyPosts(req, res, next) {
        this.postController.allmyPosts(req, res);
    }
    MyPost(req, res, next) {
        this.postController.myPost(req, res);
    }
    LikePost(req, res, next) {
        this.postController.likePost(req, res);
    }
    UnLikePost(req, res, next) {
        this.postController.unlikePost(req, res);
    }
    CreateComment(req, res, next) {
        this.commentsController.createComment(req, res);
    }
    AllComments(req, res) {
        this.commentsController.allComments(req, res);
    }
    FetchComment(req, res) {
        this.commentsController.fetchComment(req, res);
    }
}
exports.RoutingComponents = RoutingComponents;
//# sourceMappingURL=routing-components.js.map