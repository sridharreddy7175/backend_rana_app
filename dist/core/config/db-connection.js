"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = void 0;
const appConfig_1 = require("../../config/appConfig");
const mongoose = require("mongoose");
const DBConnection = mongoose.connect(appConfig_1.appConfig.database.host, {});
exports.DBConnection = DBConnection;
DBConnection.then(() => { }).catch((err) => { });
//# sourceMappingURL=db-connection.js.map