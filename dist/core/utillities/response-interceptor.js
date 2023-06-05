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
exports.ResponseInterceptor = void 0;
class ResponseInterceptor {
    constructor() {
        this.RESPONSE_SUCCESS = 200;
        this.UNAUTHORIZED_ACCESS = 401;
    }
    successResponse(req, res, code = 200, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // let responseData: any = {};
            // responseData["status"] = "Success";
            // responseData["code"] = code;
            // responseData["message"] = message;
            // responseData['data']=data;
            let responseData = {
                status: 'success',
                ver: "1.0.0"
            };
            if (message && message != '') {
                responseData['message'] = message;
            }
            if (data && data != '') {
                responseData['data'] = data;
            }
            // this.addToLogger(res);
            // res.status(this.RESPONSE_SUCCESS);
            // res.send(responseData);
            res.status(this.RESPONSE_SUCCESS).send(responseData);
            // return res.status(this.RESPONSE_SUCCESS).send(responseData);
        });
    }
    sendSuccess(res, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseData = {
                status: 'success',
                ver: "1.0.0"
            };
            if (message && message != '') {
                responseData['message'] = message;
            }
            if (data && data != '') {
                responseData['data'] = data;
            }
            res.status(this.RESPONSE_SUCCESS).send(responseData);
        });
    }
    errorResponse(res, code, message, err) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorResponseData = {};
            errorResponseData["status"] = "Fail";
            errorResponseData["code"] = code;
            errorResponseData["message"] = message;
            if (err && err.message) {
                errorResponseData["error"] = err.message;
            }
            res.status(code).send(errorResponseData);
        });
    }
    sendUnauthorizedAccessError(res, errorCode, message, details) {
        let responseData = {
            status: 'fail',
            ver: "1.0.0",
            message: message || 'Unauthorized access',
        };
        res.status(this.UNAUTHORIZED_ACCESS).send(responseData);
    }
}
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response-interceptor.js.map