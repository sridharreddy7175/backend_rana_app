import { AuthGuard } from '../utillities/auth-gaurd/auth-gaurd';
import { UserModel } from '../models/user-model';
import { ResponseInterceptor } from "../utillities/response-interceptor";
import * as bcrypt from "bcryptjs";
import * as mongoose from 'mongoose';
// import * as crypto from 'node:crypto';
import * as jwt from 'jsonwebtoken';
import { appConfig } from "../../config/appConfig";

import { transporter } from '../utillities/mailer';





export class UserController {
  userModel: typeof UserModel;
  responseInterceptor: ResponseInterceptor;
  authGuard:AuthGuard;

  constructor() {
    this.userModel = UserModel;
    this.responseInterceptor = new ResponseInterceptor();
    this.authGuard=new AuthGuard();
  }

  async createUser(req, res): Promise<void> {
    try {
        const userData: any = req.body;
        if (!userData.name) {
            this.responseInterceptor.errorResponse(res, 400, 'User Name is Required', '');
            return;
        } 
        if (!userData.email) {
            this.responseInterceptor.errorResponse(res, 400, 'User Email is Required', '');
            return;
        }
         // check if the user is exists
         let emailVaild=await this.userModel.findOne({email:userData.email})
         if(emailVaild){
            this.responseInterceptor.errorResponse(res, 400, 'User is Already Exists!!', '');
         }

        if (!userData.password) {
            this.responseInterceptor.errorResponse(res, 400, 'Password is Required', '');
            return;
        }
           // encrypt the password
           let salt = await bcrypt.genSalt(10);
           let encryptPassword = await bcrypt.hash(userData.password, salt);

          // save to db
          let saveduser = new this.userModel({
            name : userData.name,
            email : userData.email,
            password : encryptPassword,
            phone:userData.phone
        });
        saveduser = await saveduser.save();
        return this.responseInterceptor.successResponse(req, res, null, 'Successfully Created', { user_id: saveduser._id });

    } catch (err) {
       return this.responseInterceptor.errorResponse(res, 400, 'Server error', err);
    }
}

async userLogin(req,res){
  try {
    let {email,password}=req.body;
    if (!email || !password) return this.responseInterceptor.errorResponse(res,  400, 'Invalid credentials.','');
    try {
      let userCredentials = await this.userModel.findOne({ email: email  })
      if (!userCredentials) {
      return this.responseInterceptor.errorResponse(res, 400, 'Invalid credentials.', '');
    }
         // check if the password is correct
         let isPasswordCompared:boolean = await bcrypt.compare(password , userCredentials.password);
         if(!isPasswordCompared){
          return this.responseInterceptor.errorResponse(res, 401, 'Invalid Password', '');  
         }

         if (isPasswordCompared) {
          let token = await this.authGuard.generateAuthToken({
              "id": userCredentials._id,
              "email": userCredentials.email,
          });
          return this.responseInterceptor.successResponse(req, res, 200, 'token generated', token);

        }  

    }
    catch(err){
      return this.responseInterceptor.errorResponse(res, 500, "db operation failed",err);
    }
    
  }
  catch(err){
    return this.responseInterceptor.errorResponse(res, 500, 'Server error', err);
  }


 
}

  async allUserDetails(req, res) {
   try{
   let currentOffset = 0;
   let pageLimit:any;
   if (req.query.limit) {
    pageLimit = Number(req.query.limit)
}
if (req.query.pageno) {
    currentOffset = pageLimit * (req.query.pageno - 1)
}
 const result=await this.userModel.find().limit(pageLimit).skip(currentOffset)
return this.responseInterceptor.successResponse(req, res, 200, 'Data found', result);


   
   }
   catch(err){
    return this.responseInterceptor.errorResponse(res, 500, 'Server error', err);

   }
     

  }

  async updateUser(req,res){
    try{
      let userData = req.body;
      if (req.body._id) {
     //checking the existance user
     let userCredentials = await this.userModel.findOne({  _id: userData._id  })
     if (!userCredentials) {
         return this.responseInterceptor.errorResponse(res, 400,'User does not exists');
     }
     const query = {
      _id: new mongoose.Types.ObjectId(userData._id)
  }
     this.userModel.updateOne(query,userData).then(data=>{
      return this.responseInterceptor.sendSuccess(res, "Success fully updated.");

     }).catch(err=>{
      this.responseInterceptor.errorResponse(res, 400, 'db operation failed', err);  

     })
    }
    else{
      return this.responseInterceptor.errorResponse(res, 400, 'Bad Request', '');
    }
  }
    catch(err){
      return this.responseInterceptor.errorResponse(res, 500, 'Something went wrong', err);

    }

  }


  async userForgotpassword(req,res){
    try {
      let {email,id}=req.body;
      let user=await this.userModel.findOne({email:email});
      if(!user){
        return this.responseInterceptor.errorResponse(res,404,"User not found",'')
      }

        // token generate for reset password
        const token = jwt.sign({_id:user._id},appConfig.session_token,{
          expiresIn:"120s"
      });
      if(token){
        const mailOptions = {
            from:'help@ums.dev',
            to:email,
            subject:"Sending Email For password Reset",
            text:`This Link Valid For 2 MINUTES http://localhost:3001/forgotpassword/${user.id}/${token}`
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("error",error);
                this.responseInterceptor.errorResponse(res, 400, 'email not send', error);  
            }else{
                console.log("Email sent",info.response);
                return this.responseInterceptor.sendSuccess(res, "Email sent Succsfully");

            }
        })

    }

    }
    catch(err){
      return this.responseInterceptor.errorResponse(res, 500, 'Something went wrong', err);

    }
    
  }

  async userInfo(req,res){
    try {
      let email = req.body.email;
      let users= await this.userModel.findOne({ email: email  });
      if (!users) {
        return this.responseInterceptor.errorResponse(res,404,"Invalid Credentials",'')
      }
      let currentUserData = {
          id: users._id,
          name: users.name,
          email: users.email,
          password_changed: users.password,
          phone: users.phone
      }
      return this.responseInterceptor.successResponse(req, res, null, "Data found", currentUserData)
  } catch (error) {
    return this.responseInterceptor.errorResponse(res, 500, 'Something went wrong', error);
  }
  }
  async deleteUser(req,res){
    try {
      const deleteUserData = req.params.id;
      if (!deleteUserData) {
          this.responseInterceptor.errorResponse(res, 400, '_id is Required', '');
          return;
      }
      const deleteObject = {
          _id: new mongoose.Types.ObjectId(deleteUserData)
      };
      const response = await this.userModel.deleteOne(deleteObject);
      if (response) {
        return this.responseInterceptor.sendSuccess(res, "User Removed successfully");
      } else {
          this.responseInterceptor.errorResponse(res, 400, 'Failed to remove the user', response);
          return;
      }
  } catch (err) {
      this.responseInterceptor.errorResponse(res, 400, 'Failed to remove the user', err);
      return;
  }
  }

  



}
