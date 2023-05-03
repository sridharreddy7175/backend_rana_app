import { RoutingComponents } from "./routing-components";

export class AppRoutes {
  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];
  constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();

    /**
     * GET Data APIs list
     */
    this.AppGetRoutes = [
      {
        path: "/allUserDetails",
        component: [
          routingComponents.AllUserDetails.bind(routingComponents)
        ]
      },

      //  todo remove after data fatech done..
      // 404
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents),
        ],
      },
    ];

    /**
     * POST APIs list
     */
    this.AppPostRoutes = [
      // CreateUser
      {
        path: "/createUser",
        component: [routingComponents.CreateUser.bind(routingComponents)],
      },
      
      // UserLogin

      {
        path: "/userLogin",
        component: [routingComponents.UserLogin.bind(routingComponents)],
      },

    ];
       /**
         * Put calls
         */
       this.AppUpdateRoutes = [
        {
            path: '/updateUsers',
            component: [
                routingComponents.updateUser.bind(routingComponents)
            ]
        },

    ];
  }
}
