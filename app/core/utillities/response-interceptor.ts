export class ResponseInterceptor {
  constructor() {}
  RESPONSE_SUCCESS = 200;
  UNAUTHORIZED_ACCESS = 401;

  public async successResponse(req, res, code:number=200, message?:string, data?:any){
    // let responseData: any = {};
    // responseData["status"] = "Success";
    // responseData["code"] = code;
    // responseData["message"] = message;
    // responseData['data']=data;
    let responseData = {
      status: 'success',
      ver:"1.0.0"
  }
  if(message && message != ''){
      responseData['message']=message;
  }
  if(data && data != ''){
      responseData['data']=data;
  }
  // this.addToLogger(res);
  // res.status(this.RESPONSE_SUCCESS);
  // res.send(responseData);
  res.status(this.RESPONSE_SUCCESS).send(responseData);


    // return res.status(this.RESPONSE_SUCCESS).send(responseData);
  }

  public async sendSuccess(res, message?:string, data?:any) {

    let responseData = {
        status: 'success',
        ver:"1.0.0"
    }
    if(message && message != ''){
        responseData['message']=message;
    }
    if(data && data != ''){
        responseData['data']=data;
    }
    res.status(this.RESPONSE_SUCCESS).send(responseData);
}
  public async errorResponse(res: any, code: any, message: any, err?: any) {
    let errorResponseData: any = {};
    errorResponseData["status"] = "Fail";
    errorResponseData["code"] = code;
    errorResponseData["message"] = message;
    if (err && err.message) {
      errorResponseData["error"] = err.message;
    }

    res.status(code).send(errorResponseData);
  }
  sendUnauthorizedAccessError(res, errorCode, message, details) {

    let responseData = {
        status: 'fail',
        ver:"1.0.0",
        message: message || 'Unauthorized access',
    }
    res.status(this.UNAUTHORIZED_ACCESS).send(responseData);
}
}
