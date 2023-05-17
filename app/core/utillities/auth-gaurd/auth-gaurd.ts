import * as jwt from 'jsonwebtoken';
import { ResponseInterceptor } from "../response-interceptor";
import { appConfig } from "../../../config/appConfig";
import {UserModel} from '../../models/user-model'



export class AuthGuard {
  responseInterceptor: ResponseInterceptor;
  userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
    this.responseInterceptor = new ResponseInterceptor();
  }

 async authCheck(req, res, next) {
    //access token checking
    let token = req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'] || req.headers['session'] || req.headers['Bearer'];
   
    if (token) {
      
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      
      jwt.verify(token, appConfig.session_token, (err, decoded) => {
        if (err) {
          this.responseInterceptor.errorResponse(res, 400, 'Token is not valid', '');
          
        } else {

          const user = this.userModel.findOne({_id: decoded?.data?.id})
          req.user = user
          next();
        };
      });

    } else {
    return this.responseInterceptor.errorResponse(res, 401, 'Unauthorized Access', '');

    }
  }

  async generateAuthToken(jwtObj) {
    let payload = {
        id:jwtObj._id,
    };
    const token = jwt.sign({
      data: payload
    }, appConfig.session_token, { expiresIn: '1h' });;
  return token;
  }
  
}
