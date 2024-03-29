import { AuthGuard } from "../utillities/auth-gaurd/auth-gaurd";
import { UserModel } from "../models/user-model";
import { ResponseInterceptor } from "../utillities/response-interceptor";
import * as bcrypt from "bcryptjs";
import * as mongoose from "mongoose";

export class UserController {
  userModel: typeof UserModel;
  responseInterceptor: ResponseInterceptor;
  authGuard: AuthGuard;

  constructor() {
    this.userModel = UserModel;
    this.responseInterceptor = new ResponseInterceptor();
    this.authGuard = new AuthGuard();
  }

  async createUser(req, res): Promise<void> {
    try {
      const userData: any = req.body;
      if (!userData.name) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "User Name is Required",
          ""
        );
        return;
      }
      if (!userData.email) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "User Email is Required",
          ""
        );
        return;
      }
      // check if the user is exists
      let emailVaild = await this.userModel.findOne({ email: userData.email });
      if (emailVaild) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "User is Already Exists!!",
          ""
        );
      }

      if (!userData.password) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "Password is Required",
          ""
        );
        return;
      }

      // encrypt the password
      let salt = await bcrypt.genSalt(10);
      let encryptPassword = await bcrypt.hash(userData.password, salt);
      let saveduser: any;
      if (userData.accountType && userData.accountType === "admin") {
        saveduser = new this.userModel({
          name: userData.name,
          email: userData.email,
          password: encryptPassword,
          phone: userData.phone,
          accountType: "admin",
          activeStatus: true,
        });
      } else {
        // save to db
        saveduser = new this.userModel({
          name: userData.name,
          email: userData.email,
          password: encryptPassword,
          phone: userData.phone,
          accountType: userData.accountType,
        });
      }

      saveduser = await saveduser.save();
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Successfully Created",
        { user_id: saveduser._id }
      );
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        400,
        "Server error",
        err
      );
    }
  }

  async userLogin(req, res) {
    try {
      let { email, password } = req.body;
      if (!email || !password)
        return this.responseInterceptor.errorResponse(
          res,
          400,
          "Invalid credentials.",
          ""
        );
      try {
        let userCredentials: any = await this.userModel.findOne({
          email: email,
        });
        if (!userCredentials) {
          return this.responseInterceptor.errorResponse(
            res,
            400,
            "Invalid credentials.",
            ""
          );
        }
        // check if the password is correct
        let isPasswordCompared: boolean = await bcrypt.compare(
          password,
          userCredentials.password
        );
        if (!isPasswordCompared) {
          return this.responseInterceptor.errorResponse(
            res,
            400,
            "Invalid Password",
            ""
          );
        }

        if (userCredentials?.activeStatus) {
          if (isPasswordCompared) {
            let token = await this.authGuard.generateAuthToken(
              userCredentials._id
            );
            let currentUserData = {
              id: userCredentials._id,
              name: userCredentials.name,
              email: userCredentials.email,
              phone: userCredentials.phone,
              accountType: userCredentials.accountType,
              profileUrl:userCredentials.profileUrl,
              token: token,
            };
            return this.responseInterceptor.successResponse(
              req,
              res,
              200,
              "LoggedIn Successfully",
              currentUserData
            );
          }
        } else {
          return this.responseInterceptor.errorResponse(
            res,
            400,
            "Once admin is approved he will be login"
          );
        }
      } catch (err) {
        return this.responseInterceptor.errorResponse(
          res,
          500,
          "db operation failed",
          err
        );
      }
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Server error",
        err
      );
    }
  }

  async allUserDetails(req, res) {
    try {
      let currentOffset = 0;
      let pageLimit;
      if (req.query.limit) {
        pageLimit = Number(req.query.limit);
      }

      if (req.query.pageno) {
        currentOffset = pageLimit * (req.query.pageno - 1);
      }
      // Build query based on search term
      const searchQuery: any = {};
      if (req.query.search) {
        searchQuery.name = { $regex: req.query.search, $options: "i" }; // Case-insensitive regex search
      }
      const total = await UserModel.countDocuments(searchQuery);
      console.log("tttt", total);
      const result = await UserModel.find(searchQuery)
        .limit(pageLimit)
        .skip(currentOffset)
        .select("-password");
      let data = {
        count: total,
        result: result,
      };
      return this.responseInterceptor.successResponse(
        req,
        res,
        200,
        "Data found",
        data
      );
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Server error",
        err
      );
    }
  }

  async updateUser(req, res) {
    try {
      const { user_id, name, mobile } = req.body
      if (req.body.user_id) {
        //checking the existance user
        let userCredentials = await this.userModel.findOne({
          _id: user_id,
        });
        if (!userCredentials) {
          return this.responseInterceptor.errorResponse(
            res,
            400,
            "User does not exists"
          );
        }
        const query = {
          _id: new mongoose.Types.ObjectId(user_id),
        };
        let userData={
          name:name,
          profileUrl:req.file.originalname,
          mobile:mobile
        }
        this.userModel
          .updateOne(query, userData)
          .then((data) => {
            return this.responseInterceptor.sendSuccess(
              res,
              "Success fully updated."
            );
          })
          .catch((err) => {
            this.responseInterceptor.errorResponse(
              res,
              400,
              "db operation failed",
              err
            );
          });
      } else {
        return this.responseInterceptor.errorResponse(
          res,
          400,
          "Bad Request",
          ""
        );
      }
    } catch (err) {
      console.log("error",err)
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Something went wrong",
        err
      );
    }
  }

  async userInfo(req, res) {
    try {
      let email = req.body.email;
      let users = await this.userModel.findOne({ email: email });
      if (!users) {
        return this.responseInterceptor.errorResponse(
          res,
          404,
          "Invalid Credentials",
          ""
        );
      }
      let currentUserData = {
        id: users._id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        accountType: users.accountType,
        profileUrl:users.profileUrl
      };
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Data found",
        currentUserData
      );
    } catch (error) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Something went wrong",
        error
      );
    }
  }
  async deleteUser(req, res) {
    try {
      const deleteUserData = req.params.id;
      if (!deleteUserData) {
        this.responseInterceptor.errorResponse(res, 400, "_id is Required", "");
        return;
      }
      const deleteObject = {
        _id: new mongoose.Types.ObjectId(deleteUserData),
      };
      const response = await this.userModel.deleteOne(deleteObject);
      if (response) {
        return this.responseInterceptor.sendSuccess(
          res,
          "User Removed successfully"
        );
      } else {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "Failed to remove the user",
          response
        );
        return;
      }
    } catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the user",
        err
      );
      return;
    }
  }

  async follow(req, res) {
    try {
      const { followId } = req.body;
      const loginUserId = req?.user?._conditions?._id;

      //find the target user and check if the login id exist
      const targetUser: any = await this.userModel.findById(followId);

      const alreadyFollowing = targetUser?.followers?.find(
        (user) => user?.toString() === loginUserId.toString()
      );

      if (alreadyFollowing)
        throw new Error("You have already followed this user");

      //1. Find the user you want to follow and update it's followers field
      await this.userModel.findByIdAndUpdate(
        followId,
        {
          $push: { followers: loginUserId },
          isFollowing: true,
        },
        { new: true }
      );

      //2. Update the login user following field
      await this.userModel.findByIdAndUpdate(
        loginUserId,
        {
          $push: { following: followId },
        },
        { new: true }
      );
      return this.responseInterceptor.sendSuccess(
        res,
        "You have successfully followed this user"
      );
    } catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the user",
        err
      );
    }
  }
  async unFollow(req, res) {
    try {
      const { unFollowId } = req.body;
      const loginUserId = req?.user?._conditions?._id;
      console.log("unFollw");

      await this.userModel.findByIdAndUpdate(
        unFollowId,
        {
          $pull: { followers: loginUserId },
          isFollowing: false,
        },
        { new: true }
      );

      await this.userModel.findByIdAndUpdate(
        loginUserId,
        {
          $pull: { following: unFollowId },
        },
        { new: true }
      );

      return this.responseInterceptor.sendSuccess(
        res,
        "You have successfully unfollowed this user"
      );
    } catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the user",
        err
      );
    }
  }

  async activeUser(req, res) {
    try {
      let { email, accountType } = req.body;
      let users: any = await this.userModel.findOne({ email: email });
      if (!users.email) {
        this.responseInterceptor.errorResponse(
          res,
          400,
          "email is Required",
          ""
        );
        return;
      }
      const query = {
        _id: new mongoose.Types.ObjectId(users._id),
      };
      await this.userModel
        .updateMany({ _id: query }, [
          { $set: { activeStatus: true, accountType: accountType } },
        ])
        .then((data) => {
          return this.responseInterceptor.sendSuccess(
            res,
            "Success fully Actived."
          );
        })
        .catch((err) => {
          this.responseInterceptor.errorResponse(
            res,
            400,
            "db operation failed",
            err
          );
        });
    } catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the user",
        err
      );
    }
  }


  async suggestionsUser(req, res) {
    try {
      console.log("req===>", req.user);
      // const newArr = [...req.user.following, req?.user?._conditions?._id];
      // console.log("hhhhhh")

      // const num = req.query.num || 10;

      // const users = await this.userModel.aggregate([
      //   { $match: { _id: { $nin: newArr } } },
      //   { $sample: { size: Number(num) } },
      //   {
      //     $lookup: {
      //       from: "UserModel",
      //       localField: "followers",
      //       foreignField: "_id",
      //       as: "followers",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "UserModel",
      //       localField: "following",
      //       foreignField: "_id",
      //       as: "following",
      //     },
      //   },
      // ]);
      // return this.responseInterceptor.successResponse(
      //   req,
      //   res,
      //   200,
      //   "Data found",
      //   users
      // );
    } catch (err) {
      this.responseInterceptor.errorResponse(
        res,
        400,
        "Failed to remove the user",
        err
      );
    }
  }
}
