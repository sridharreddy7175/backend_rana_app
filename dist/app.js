"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose_1 = require("mongoose");
const cors = require("cors");
const appConfig_1 = require("./config/appConfig");
const app_routes_1 = require("./routes/app.routes");
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
class App {
    constructor() {
        this.PORT = appConfig_1.appConfig.server.port;
        this.mongoUrl = appConfig_1.appConfig.database.host;
        this.app = express();
        this.mongoSetup();
        console.log("port---------->", this.PORT);
        this.config();
        this.app.get("/", (req, res) => {
            res.send("Welcome To Rana App");
        });
        this.loadAndConfig();
        this.app.listen(this.PORT, () => {
            console.log(`[server]: Server is running at https://localhost:${this.PORT}`);
        });
    }
    mongoSetup() {
        console.log(this.mongoUrl);
        mongoose_1.default.connect(this.mongoUrl);
    }
    loadAndConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            this.config();
            const appRoutes = new app_routes_1.AppRoutes();
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
        });
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map