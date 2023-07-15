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
exports.ForgotPasswordController = void 0;
const auth_gaurd_1 = require("../utillities/auth-gaurd/auth-gaurd");
const user_model_1 = require("../models/user-model");
const response_interceptor_1 = require("../utillities/response-interceptor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appConfig_1 = require("../../config/appConfig");
const mailer_1 = require("../utillities/mailer");
class ForgotPasswordController {
    constructor() {
        this.userModel = user_model_1.UserModel;
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.authGuard = new auth_gaurd_1.AuthGuard();
    }
    userForgotpassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, id } = req.body;
                let user = yield this.userModel.findOne({ email: email });
                if (!user) {
                    return this.responseInterceptor.errorResponse(res, 404, "User not found", "");
                }
                // token generate for reset password
                const token = jwt.sign({ _id: user._id }, appConfig_1.appConfig.session_token, {
                    expiresIn: "1h",
                });
                console.log("token", token);
                if (token) {
                    const link = `${req.protocol}://localhost:8850/reset/password/${token}`;
                    console.log("link", link);
                    yield (0, mailer_1.sendEmail)(email, "sridharreddypalle7175@gmail.com", "Best To Do password reset", `
          <div>Click the link below to reset your password</div><br/>
          <div>${link}</div>
          `);
                    return res.status(200).send({
                        message: "Password reset link has been successfully sent to your inbox",
                    });
                }
            }
            catch (err) {
                console.log("errrr", err);
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
    PwdResetLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                const { password } = req.body;
                const verifyToken = jwt.verify(token, appConfig_1.appConfig.session_token);
                console.log("VerifyToken", verifyToken);
                if (verifyToken._id) {
                    const newpassword = yield bcrypt.hash(password, 12);
                    const setnewuserpass = yield this.userModel.findByIdAndUpdate({ _id: verifyToken._id }, { password: newpassword });
                    setnewuserpass.save();
                    return this.responseInterceptor.successResponse(req, res, null, "Successfully Updated your password", { user_id: setnewuserpass._id });
                }
                else {
                    return this.responseInterceptor.errorResponse(res, 401, "user not exist");
                }
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
//# sourceMappingURL=forgotPassword-controller.js.map