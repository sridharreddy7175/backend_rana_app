import { RoutingComponents } from "./routing-components";
import { AuthGuard } from "../core/utillities/auth-gaurd/auth-gaurd";
import { Validator } from "../core/utillities/validator/validator";
import { userSchema } from "./payload_schems/user-schemas";

export class AppRoutes {
  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];
  public authGuard: AuthGuard;
  public validator: Validator;

  constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();
    this.authGuard = new AuthGuard();
    this.validator = new Validator();

    /**
     * GET Data APIs list
     */
    this.AppGetRoutes = [
      {
        path: "/allUserDetails",
        component: [
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
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
          this.validator.validateBodyPayload.bind(this.validator, userSchema),
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
    ];
    /**
     * Put calls
     */
    this.AppUpdateRoutes = [
      {
        path: "/updateUser",
        component: [
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.UpdateUser.bind(routingComponents),
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
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.DeleteUser.bind(routingComponents),
        ],
      },
    ];
  }
}
