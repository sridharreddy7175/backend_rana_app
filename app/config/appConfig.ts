const dotenv = require("dotenv");
dotenv.config();

var SERV_ENV = verifyenv("SERV_ENV") || "dev";
var SERV_PORT = verifyenv("SERV_PORT") || 8825;
var DATABASE_URL = verifyenv("DATABASE_URL") || "";
var DATABASE_URL = verifyenv("DATABASE_URL") || "";
var SESSION_TOKEN = verifyenv("SESSION_TOKEN") || "SESSION_TOKEN";



function verifyenv(env_key: any) {
  console.log("envKey", env_key);
  if (process.env[env_key] == undefined) {
    return undefined;
  } else {
    return process.env[env_key];
  }
}

export const appConfig = {
  server_env: SERV_ENV,
  server: {
    port: SERV_PORT,
  },
  database: {
    host: DATABASE_URL,
  },
  "session_token": SESSION_TOKEN,
  apikey:"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"
};
