"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
// import * as Joi from 'joi'
const response_interceptor_1 = require("../response-interceptor");
const Joi = require('joi');
class Validator {
    constructor() {
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
    }
    validateBodyPayload(schema, req, res, next) {
        Joi.validate(req.body, schema).then((payload) => {
            // logger.info("Payload Validation is Successfull")
            console.log("Payload Validation is Successfull");
            next();
        }).catch((error) => {
            // this.sendBadRequest(res, "Payload Validation Failed")
            return this.responseInterceptor.errorResponse(res, 401, 'Payload Validation Failed', error);
        });
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map