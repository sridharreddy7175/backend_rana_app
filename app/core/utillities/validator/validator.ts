// import * as Joi from 'joi'
import { ResponseInterceptor } from "../response-interceptor";
const Joi = require('joi');

export class Validator {
  responseInterceptor: ResponseInterceptor;

  constructor(){
    this.responseInterceptor = new ResponseInterceptor();

  }

  
  validateBodyPayload(schema, req, res, next) {

    Joi.validate(req.body, schema).then((payload) => {
        // logger.info("Payload Validation is Successfull")
        console.log("Payload Validation is Successfull");
        next();
    }).catch((error) => {
        // this.sendBadRequest(res, "Payload Validation Failed")
        return this.responseInterceptor.errorResponse(res, 401, 'Payload Validation Failed', error);

    })
    
}
}

