export class ResponseInterceptor {
  constructor() {}
  public async successResponse(res: any, code: any, message: any, data: any) {
    let responseData: any = {};
    responseData["status"] = "Success";
    responseData["code"] = code;
    responseData["message"] = message;
    responseData['data']=data;

    return res.status(code).send(responseData);
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
}
