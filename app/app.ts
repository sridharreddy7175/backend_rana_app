import * as express from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import * as cors from "cors";
import { appConfig } from "./config/appConfig";
import { AppRoutes } from './routes/app.routes';
import * as swaggerUi from "swagger-ui-express";
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');


class App {
  public app: express.Application;
  private PORT: any = appConfig.server.port;
  public mongoUrl= appConfig.database.host;

  

  constructor() {
    this.app = express();
    this.mongoSetup();
    console.log("port---------->",this.PORT)
    this.config();
    this.app.get("/", (req, res) => {
      res.send("Welcome To Rana App");
    });
    this.loadAndConfig();
    this.app.listen(this.PORT, () => {
      console.log(
        `[server]: Server is running at http://localhost:${this.PORT}`
      );
    });
  }
  
  private mongoSetup(): void {
    console.log(this.mongoUrl);
    mongoose.connect(this.mongoUrl);
}
  async loadAndConfig(){
    this.config();
    const appRoutes = new AppRoutes();
    for (var i = 0; i < appRoutes.AppGetRoutes.length; i++) {
        this.app.get(appRoutes.AppGetRoutes[i].path, [appRoutes.AppGetRoutes[i].component]);
    }
    for (var i = 0; i < appRoutes.AppPostRoutes.length; i++) {
        this.app.post(appRoutes.AppPostRoutes[i].path, [appRoutes.AppPostRoutes[i].component]);
    }
    for (var i = 0; i < appRoutes.AppUpdateRoutes.length; i++) {
        this.app.put(appRoutes.AppUpdateRoutes[i].path, [appRoutes.AppUpdateRoutes[i].component]);
    }
    for (var i = 0; i < appRoutes.AppDeleteRoutes.length; i++) {
        this.app.delete(appRoutes.AppDeleteRoutes[i].path, [appRoutes.AppDeleteRoutes[i].component]);
    }

}

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

}

export default new App().app;
