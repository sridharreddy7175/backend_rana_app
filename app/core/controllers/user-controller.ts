import { AuthGuard } from '../utillities/auth-gaurd/auth-gaurd';
import { UserModel } from '../models/user-model';
import { ResponseInterceptor } from "../utillities/response-interceptor";
import * as bcrypt from "bcryptjs";
import * as mongoose from 'mongoose';





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
    // console.log("sridhar",req)
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
        this.responseInterceptor.successResponse(res, 200, 'Registration is Success', saveduser);  
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
              "id": userCredentials.id,
              "email": userCredentials.email,
          });
          console.log("sridharreddy",token)
          let apiResponse:any = { ...token }
          this.responseInterceptor.successResponse(res, 200, 'token generated', apiResponse);  
        }  

    }
    catch(err){
      return this.responseInterceptor.errorResponse(res, 500, "db operation failed",'');
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
 this.responseInterceptor.successResponse(res, 200, 'Data found', result);  

   
   }
   catch(err){
    return this.responseInterceptor.errorResponse(res, 500, 'Server error', err);

   }
     

  }

  async updateUser(req,res){
    // 
    // if(!userData._id){

    // }
    try{
      let userData = req.body;
      if (req.body.user_id) {
     //checking the existance user
     let userCredentials = await this.userModel.findOne({  id: userData._id  })
     if (!userCredentials) {
         return this.responseInterceptor.errorResponse(res, 400,'User does not exists');
     }
     const query = {
      _id: new mongoose.Types.ObjectId(userData._id)
  }
     this.userModel.updateOne(query,userData).then(data=>{
      
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
}
