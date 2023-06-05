"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const routing_components_1 = require("./routing-components");
const auth_gaurd_1 = require("../core/utillities/auth-gaurd/auth-gaurd");
const validator_1 = require("../core/utillities/validator/validator");
const user_schemas_1 = require("./payload_schems/user-schemas");
class AppRoutes {
    constructor() {
        const routingComponents = new routing_components_1.RoutingComponents();
        this.authGuard = new auth_gaurd_1.AuthGuard();
        this.validator = new validator_1.Validator();
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
                path: "/user/info",
                component: [
                    this.authGuard.authCheck.bind(this.authGuard),
                    routingComponents.UserInfo.bind(routingComponents),
                ],
            },
            // CreateMovie
            {
                path: "/create/movie",
                component: [
                    // this.authGuard.authCheck.bind(this.authGuard),
                    // this.validator.validateBodyPayload.bind(this.validator, userSchema),
                    routingComponents.CreateMovie.bind(routingComponents),
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