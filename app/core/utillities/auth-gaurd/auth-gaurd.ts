import * as jwt from 'jsonwebtoken';
import { ResponseInterceptor } from "../response-interceptor";
import { appConfig } from "../../../config/appConfig";



export class AuthGuard {
  responseInterceptor: ResponseInterceptor;
  constructor() {
    this.responseInterceptor = new ResponseInterceptor();
  }

  authCheck(req, res, next) {
    //access token checking
    let token = req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'] || req.headers['session'] || req.headers['Bearer'];
   
    if (token) {
      
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      
      jwt.verify(token, appConfig.session_token, (err, decoded) => {

        if (err) {
          // return this.sendBadRequest(res, "Token is not valid");
          this.responseInterceptor.errorResponse(res, 400, 'Token is not valid', '');
          

        } else {

          req['data']={
          loggedUser: decoded
          }
          next();
        };
      });

    } else {
      // return this.sendBadRequest(res, "Unauthorized Access");
    return this.responseInterceptor.errorResponse(res, 401, 'Unauthorized Access', '');

    }
  }

  async generateAuthToken(jwtObj) {
    let payload = {
        id:jwtObj._id,
        email:jwtObj.email
    };
    // let token=await jwt.sign(payload,appConfig.session_token)
    let tit = Date.now();
    //setting Token Expiry Time[tet]
    const tokenExpireTimeInMinutes:any = "30";
    const tokenExpireTimeInSec:any = tokenExpireTimeInMinutes*60;
    const tokenExpireTimeInMS:any = tokenExpireTimeInSec*1000;
    let tet = tit + tokenExpireTimeInMS;
    const token = jwt.sign({
      data: payload
    }, appConfig.session_token, { expiresIn: '1h' });;
  //  console.log("token",token)
  //   return {
  //       "token": token,
  //       "expiresIn": tet
  //   }
  return token;
  }
  
}
