import { RoutingComponents } from "./routing-components";
import { AuthGuard } from "../core/utillities/auth-gaurd/auth-gaurd";
import { Validator } from "../core/utillities/validator/validator";
import { userSchema } from "./payload_schems/user-schemas";
import * as multer from "multer";
import { storage } from "../core/utillities/imageupload";

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
    // const upload = multer({ dest: '../files/' })
    const upload = multer({ storage: storage });

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
      {
        path: "/allReelDetails",
        component: [
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.AllReelDetails.bind(routingComponents),
        ],
      },
      {
        path: "/user/pwd-reset-link/:id",
        component: [
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.AllUserDetails.bind(routingComponents),
        ],
      },
      {
        path: "/allMoviesLists",
        component: [
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.AllMoviesLists.bind(routingComponents),
        ],
      },

      {
        path: "/fetch/movie/:id",
        component: [
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
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
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.AllMyPosts.bind(routingComponents),
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
      {
        path: "/like/:postId",
        component: [
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.LikePost.bind(routingComponents),
        ],
      },
      {
        path: "/unlike/:postId",
        component: [
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.UnLikePost.bind(routingComponents),
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
          this.authGuard.authCheck.bind(this.authGuard), //Auth Check
          routingComponents.DeleteUser.bind(routingComponents),
        ],
      },
    ];
  }
}
