import { appConfig } from "../../config/appConfig";
import * as mongoose from "mongoose";

const DBConnection = mongoose.connect(appConfig.database.host, {});

DBConnection.then(() => {}).catch((err) => {});

export { DBConnection };
