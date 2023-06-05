"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingComponents = void 0;
const response_interceptor_1 = require("../core/utillities/response-interceptor");
const user_controller_1 = require("../core/controllers/user-controller");
const movie_controller_1 = require("../core/controllers/movie-controller");
class RoutingComponents {
    constructor() {
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.userController = new user_controller_1.UserController();
        this.movieController = new movie_controller_1.MovieController();
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
        this.userController.userForgotpassword(req, res);
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
exports.RoutingComponents = RoutingComponents;
//# sourceMappingURL=routing-components.js.map