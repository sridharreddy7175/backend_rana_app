"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const routing_components_1 = require("./routing-components");
const auth_gaurd_1 = require("../core/utillities/auth-gaurd/auth-gaurd");
const validator_1 = require("../core/utillities/validator/validator");
const user_schemas_1 = require("./payload_schems/user-schemas");
const multer = require("multer");
const imageupload_1 = require("../core/utillities/imageupload");
class AppRoutes {
    constructor() {
        const routingComponents = new routing_components_1.RoutingComponents();
        this.authGuard = new auth_gaurd_1.AuthGuard();
        this.validator = new validator_1.Validator();
        // const upload = multer({ dest: '../files/' })
        const upload = multer({ storage: imageupload_1.storage });
        /**
         * GET Data APIs list
         */
        this.AppGetRoutes = [
            {
                path: "/allUserDetails",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.AllUserDetails.bind(routingComponents),
                ],
            },
            {
                path: "/allReelDetails",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.AllReelDetails.bind(routingComponents),
                ],
            },
            {
                path: "/suggestionsUser",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.SuggestionsUser.bind(routingComponents),
                ],
            },
            {
                path: "/user/pwd-reset-link/:id",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.AllUserDetails.bind(routingComponents),
                ],
            },
            {
                path: "/allMoviesLists",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.AllMoviesLists.bind(routingComponents),
                ],
            },
            {
                path: "/fetch/movie/:id",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.FetchMovie.bind(routingComponents),
                ],
            },
            {
                path: "/mypost/:postId",
                component: [
                    // this.authGuard.authCheck.bind(this.authGuard), //Auth Check
                    routingComponents.MyPost.bind(routingComponents),
                ],
            },
            {
                path: "/allmyposts",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.AllMyPosts.bind(routingComponents),
                ],
            },
            {
                path: "/allcomments",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.AllComments.bind(routingComponents),
                ],
            },
            {
                path: "/comment/:commentId",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.FetchComment.bind(routingComponents),
                ],
            },
            //  todo remove after data fatech done..
            // 404
            {
                path: "*",
                component: [routingComponents.pageNotFound.bind(routingComponents)],
            },
        ];
        /**
         * POST APIs list
         */
        this.AppPostRoutes = [
            // CreateUser
            {
                path: "/createUser",
                component: [
                    this.validator.validateBodyPayload.bind(this.validator, user_schemas_1.userSchema),
                    routingComponents.CreateUser.bind(routingComponents),
                ],
            },
            // UserLogin
            {
                path: "/userLogin",
                component: [routingComponents.UserLogin.bind(routingComponents)],
            },
            // Forgot password
            {
                path: "/forgot/password",
                component: [routingComponents.ForgotPassword.bind(routingComponents)],
            },
            {
                path: "/reset/password/:token",
                component: [routingComponents.resetPassword.bind(routingComponents)],
            },
            {
                path: "/user/info",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.UserInfo.bind(routingComponents),
                ],
            },
            {
                path: "/create/reel",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.CreateReels.bind(routingComponents),
                ],
            },
            {
                path: "/create/reel/comment",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.CreateReelComment.bind(routingComponents),
                ],
            },
            // CreateMovie
            {
                path: "/create/movie",
                component: [
                    // this.authGuard.authCheck.bind(this.authGuard),
                    // this.validator.validateBodyPayload.bind(this.validator, userSchema),
                    upload.single("poster"),
                    routingComponents.CreateMovie.bind(routingComponents),
                ],
            },
            // Post Movie
            {
                path: "/create/post",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    // this.validator.validateBodyPayload.bind(this.validator, userSchema),
                    upload.array("photos"),
                    routingComponents.CreatePost.bind(routingComponents),
                ],
            },
            {
                path: "/create/post/comment",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.CreateComment.bind(routingComponents),
                ],
            },
            // Create Event
            {
                path: "/create/event",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    // this.validator.validateBodyPayload.bind(this.validator, userSchema),
                    upload.single("poster"),
                    routingComponents.CreateEvent.bind(routingComponents),
                ],
            },
        ];
        /**
         * Put calls
         */
        this.AppUpdateRoutes = [
            {
                path: "/updateUser",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.UpdateUser.bind(routingComponents),
                ],
            },
            {
                path: "/like/:postId",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.LikePost.bind(routingComponents),
                ],
            },
            {
                path: "/unlike/:postId",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.UnLikePost.bind(routingComponents),
                ],
            },
            {
                path: "/like/comment/:commentId",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.LikeComment.bind(routingComponents),
                ],
            },
            {
                path: "/unlike/comment/:commentId",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.UnLikeComment.bind(routingComponents),
                ],
            },
            {
                path: "/like/reel/:reelId",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.LikeReels.bind(routingComponents),
                ],
            },
            {
                path: "/unlike/reel/:reelId",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.UnLikeReels.bind(routingComponents),
                ],
            },
            {
                path: "/follow",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.Follow.bind(routingComponents),
                ],
            },
            {
                path: "/unfollow",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.UnFollow.bind(routingComponents),
                ],
            },
            {
                path: "/activeuser",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.ActiveUser.bind(routingComponents),
                ],
            },
            {
                path: "/roleaccess",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.RoleAccess.bind(routingComponents),
                ],
            },
        ];
        /**
         * Delete calls
         */
        this.AppDeleteRoutes = [
            {
                path: "/delete/user/:id",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.DeleteUser.bind(routingComponents),
                ],
            },
        ];
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=app.routes.js.map