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
exports.AuthGuard = void 0;
const jwt = require("jsonwebtoken");
const response_interceptor_1 = require("../response-interceptor");
const appConfig_1 = require("../../../config/appConfig");
const user_model_1 = require("../../models/user-model");
class AuthGuard {
    constructor() {
        this.userModel = user_model_1.UserModel;
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
    }
    authCheck(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //access token checking
            let token = req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'] || req.headers['session'] || req.headers['Bearer'];
            if (token) {
                if (token.startsWith('Bearer ')) {
                    // Remove Bearer from string
                    token = token.slice(7, token.length);
                }
                jwt.verify(token, appConfig_1.appConfig.session_token, (err, decoded) => {
                    var _a;
                    if (err) {
                        this.responseInterceptor.errorResponse(res, 400, 'Token is not valid', '');
                    }
                    else {
                        const user = this.userModel.findOne({ _id: (_a = decoded === null || decoded === void 0 ? void 0 : decoded.data) === null || _a === void 0 ? void 0 : _a.id });
                        req.user = user;
                        next();
                    }
                    ;
                });
            }
            else {
                return this.responseInterceptor.errorResponse(res, 401, 'Unauthorized Access', '');
            }
        });
    }
    generateAuthToken(jwtObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = {
                id: jwtObj._id,
            };
            const token = jwt.sign({
                data: payload
            }, appConfig_1.appConfig.session_token, { expiresIn: '1h' });
            ;
            return token;
        });
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth-gaurd.js.map