import { AuthGuard } from "../utillities/auth-gaurd/auth-gaurd";
import { UserModel } from "../models/user-model";
import { ResponseInterceptor } from "../utillities/response-interceptor";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { appConfig } from "../../config/appConfig";
import { sendEmail } from "../utillities/mailer";

export class ForgotPasswordController {
  userModel: typeof UserModel;
  responseInterceptor: ResponseInterceptor;
  authGuard: AuthGuard;

  constructor() {
    this.userModel = UserModel;
    this.responseInterceptor = new ResponseInterceptor();
    this.authGuard = new AuthGuard();
  }

  async userForgotpassword(req, res) {
    try {
      let { email, id } = req.body;
      let user = await this.userModel.findOne({ email: email });
      if (!user) {
        return this.responseInterceptor.errorResponse(
          res,
          404,
          "User not found",
          ""
        );
      }

      // token generate for reset password
      const token = jwt.sign({ _id: user._id }, appConfig.session_token, {
        expiresIn: "1h",
      });
      console.log("token", token);
      if (token) {
        const link = `${req.protocol}://localhost:8850/reset/password/${token}`;
        console.log("link", link);
        await sendEmail(
          email,
          "sridharreddypalle7175@gmail.com",
          "Best To Do password reset",
          `
          <div>Click the link below to reset your password</div><br/>
          <div>${link}</div>
          `
        );
        return res.status(200).send({
          message:
            "Password reset link has been successfully sent to your inbox",
        });
      }
    } catch (err) {
      console.log("errrr", err);
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Something went wrong",
        err
      );
    }
  }

  async PwdResetLink(req, res) {
    const { token } = req.params;
    try {
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Something went wrong",
        err
      );
    }
  }
  async resetPassword(req, res) {
    const { token } = req.params;
    try {
      const { password } = req.body;
      const verifyToken: any = jwt.verify(token, appConfig.session_token);
      console.log("VerifyToken", verifyToken);
      if (verifyToken._id) {
        const newpassword = await bcrypt.hash(password, 12);
        const setnewuserpass = await this.userModel.findByIdAndUpdate(
          { _id: verifyToken._id },
          { password: newpassword }
        );
        setnewuserpass.save();
        return this.responseInterceptor.successResponse(
          req,
          res,
          null,
          "Successfully Updated your password",
          { user_id: setnewuserpass._id }
        );
      } else {
        return this.responseInterceptor.errorResponse(
          res,
          401,
          "user not exist"
        );
      }
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Something went wrong",
        err
      );
    }
  }
}
