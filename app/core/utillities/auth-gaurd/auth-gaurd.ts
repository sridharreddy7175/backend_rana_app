import * as jwt from 'jsonwebtoken';
import { ResponseInterceptor } from "../response-interceptor";
import { appConfig } from "../../../config/appConfig";

export class AuthGuard {
  responseInterceptor: ResponseInterceptor;
  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
  }

  async generateAuthToken(jwtObj) {
    let payload = {
        id:jwtObj.id,
        name:jwtObj.name
    };
    // let token=await jwt.sign(payload,appConfig.session_token)
    const token = jwt.sign(payload, appConfig.session_token);
    return {
        "token": token,
        "expiresIn": "1h"
    }
  }
  
}
