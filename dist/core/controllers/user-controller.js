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
exports.UserController = void 0;
const auth_gaurd_1 = require("../utillities/auth-gaurd/auth-gaurd");
const user_model_1 = require("../models/user-model");
const response_interceptor_1 = require("../utillities/response-interceptor");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
class UserController {
    constructor() {
        this.userModel = user_model_1.UserModel;
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
        this.authGuard = new auth_gaurd_1.AuthGuard();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                if (!userData.name) {
                    this.responseInterceptor.errorResponse(res, 400, "User Name is Required", "");
                    return;
                }
                if (!userData.email) {
                    this.responseInterceptor.errorResponse(res, 400, "User Email is Required", "");
                    return;
                }
                // check if the user is exists
                let emailVaild = yield this.userModel.findOne({ email: userData.email });
                if (emailVaild) {
                    this.responseInterceptor.errorResponse(res, 400, "User is Already Exists!!", "");
                }
                if (!userData.password) {
                    this.responseInterceptor.errorResponse(res, 400, "Password is Required", "");
                    return;
                }
                // encrypt the password
                let salt = yield bcrypt.genSalt(10);
                let encryptPassword = yield bcrypt.hash(userData.password, salt);
                let saveduser;
                if (userData.accountType && userData.accountType === "admin") {
                    saveduser = new this.userModel({
                        name: userData.name,
                        email: userData.email,
                        password: encryptPassword,
                        phone: userData.phone,
                        accountType: "admin",
                        activeStatus: true,
                    });
                }
                else {
                    // save to db
                    saveduser = new this.userModel({
                        name: userData.name,
                        email: userData.email,
                        password: encryptPassword,
                        phone: userData.phone,
                    });
                }
                saveduser = yield saveduser.save();
                return this.responseInterceptor.successResponse(req, res, null, "Successfully Created", { user_id: saveduser._id });
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 400, "Server error", err);
            }
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                if (!email || !password)
                    return this.responseInterceptor.errorResponse(res, 400, "Invalid credentials.", "");
                try {
                    let userCredentials = yield this.userModel.findOne({
                        email: email,
                    });
                    if (!userCredentials) {
                        return this.responseInterceptor.errorResponse(res, 400, "Invalid credentials.", "");
                    }
                    // check if the password is correct
                    let isPasswordCompared = yield bcrypt.compare(password, userCredentials.password);
                    if (!isPasswordCompared) {
                        return this.responseInterceptor.errorResponse(res, 400, "Invalid Password", "");
                    }
                    if (userCredentials === null || userCredentials === void 0 ? void 0 : userCredentials.activeStatus) {
                        if (isPasswordCompared) {
                            let token = yield this.authGuard.generateAuthToken(userCredentials._id);
                            let currentUserData = {
                                id: userCredentials._id,
                                name: userCredentials.name,
                                email: userCredentials.email,
                                phone: userCredentials.phone,
                                accountType: userCredentials.accountType,
                                token: token,
                            };
                            return this.responseInterceptor.successResponse(req, res, 200, "LoggedIn Successfully", currentUserData);
                        }
                    }
                    else {
                        return this.responseInterceptor.errorResponse(res, 400, "Once admin is approved he will be login");
                    }
                }
                catch (err) {
                    return this.responseInterceptor.errorResponse(res, 500, "db operation failed", err);
                }
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Server error", err);
            }
        });
    }
    allUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const searchQuery = {};
                if (req.query.search) {
                    searchQuery.name = { $regex: req.query.search, $options: "i" }; // Case-insensitive regex search
                }
                const result = yield user_model_1.UserModel.find(searchQuery)
                    .limit(pageLimit)
                    .skip(currentOffset)
                    .select("-password");
                return this.responseInterceptor.successResponse(req, res, 200, "Data found", result);
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Server error", err);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userData = req.body;
                if (req.body._id) {
                    //checking the existance user
                    let userCredentials = yield this.userModel.findOne({
                        _id: userData._id,
                    });
                    if (!userCredentials) {
                        return this.responseInterceptor.errorResponse(res, 400, "User does not exists");
                    }
                    const query = {
                        _id: new mongoose.Types.ObjectId(userData._id),
                    };
                    this.userModel
                        .updateOne(query, userData)
                        .then((data) => {
                        return this.responseInterceptor.sendSuccess(res, "Success fully updated.");
                    })
                        .catch((err) => {
                        this.responseInterceptor.errorResponse(res, 400, "db operation failed", err);
                    });
                }
                else {
                    return this.responseInterceptor.errorResponse(res, 400, "Bad Request", "");
                }
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
    userInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.body.email;
                let users = yield this.userModel.findOne({ email: email });
                if (!users) {
                    return this.responseInterceptor.errorResponse(res, 404, "Invalid Credentials", "");
                }
                let currentUserData = {
                    id: users._id,
                    name: users.name,
                    email: users.email,
                    phone: users.phone,
                    accountType: users.accountType,
                };
                return this.responseInterceptor.successResponse(req, res, null, "Data found", currentUserData);
            }
            catch (error) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", error);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUserData = req.params.id;
                if (!deleteUserData) {
                    this.responseInterceptor.errorResponse(res, 400, "_id is Required", "");
                    return;
                }
                const deleteObject = {
                    _id: new mongoose.Types.ObjectId(deleteUserData),
                };
                const response = yield this.userModel.deleteOne(deleteObject);
                if (response) {
                    return this.responseInterceptor.sendSuccess(res, "User Removed successfully");
                }
                else {
                    this.responseInterceptor.errorResponse(res, 400, "Failed to remove the user", response);
                    return;
                }
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the user", err);
                return;
            }
        });
    }
    follow(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followId } = req.body;
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                //find the target user and check if the login id exist
                const targetUser = yield this.userModel.findById(followId);
                const alreadyFollowing = (_c = targetUser === null || targetUser === void 0 ? void 0 : targetUser.followers) === null || _c === void 0 ? void 0 : _c.find((user) => (user === null || user === void 0 ? void 0 : user.toString()) === loginUserId.toString());
                if (alreadyFollowing)
                    throw new Error("You have already followed this user");
                //1. Find the user you want to follow and update it's followers field
                yield this.userModel.findByIdAndUpdate(followId, {
                    $push: { followers: loginUserId },
                    isFollowing: true,
                }, { new: true });
                //2. Update the login user following field
                yield this.userModel.findByIdAndUpdate(loginUserId, {
                    $push: { following: followId },
                }, { new: true });
                return this.responseInterceptor.sendSuccess(res, "You have successfully followed this user");
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the user", err);
            }
        });
    }
    unFollow(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unFollowId } = req.body;
                const loginUserId = (_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._conditions) === null || _b === void 0 ? void 0 : _b._id;
                console.log("unFollw");
                yield this.userModel.findByIdAndUpdate(unFollowId, {
                    $pull: { followers: loginUserId },
                    isFollowing: false,
                }, { new: true });
                yield this.userModel.findByIdAndUpdate(loginUserId, {
                    $pull: { following: unFollowId },
                }, { new: true });
                return this.responseInterceptor.sendSuccess(res, "You have successfully unfollowed this user");
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the user", err);
            }
        });
    }
    activeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email } = req.body;
                let users = yield this.userModel.findOne({ email: email });
                if (!users.email) {
                    this.responseInterceptor.errorResponse(res, 400, "email is Required", "");
                    return;
                }
                const query = {
                    _id: new mongoose.Types.ObjectId(users._id),
                };
                yield this.userModel
                    .updateMany({ _id: query }, [{ $set: { activeStatus: true } }])
                    .then((data) => {
                    return this.responseInterceptor.sendSuccess(res, "Success fully Actived.");
                })
                    .catch((err) => {
                    this.responseInterceptor.errorResponse(res, 400, "db operation failed", err);
                });
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the user", err);
            }
        });
    }
    roleAccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { accountType, email } = req.body;
                let users = yield this.userModel.findOne({ email: email });
                if (!users.email) {
                    this.responseInterceptor.errorResponse(res, 400, "email is Required", "");
                    return;
                }
                const query = {
                    _id: new mongoose.Types.ObjectId(users._id),
                };
                if (accountType) {
                    yield this.userModel
                        .updateMany({ _id: query }, [{ $set: { accountType: accountType } }])
                        .then((data) => {
                        return this.responseInterceptor.sendSuccess(res, "Role is Success fully updated.");
                    })
                        .catch((err) => {
                        this.responseInterceptor.errorResponse(res, 400, "db operation failed", err);
                    });
                }
                else {
                    this.responseInterceptor.errorResponse(res, 400, "Failed to  the update role", accountType);
                    return;
                }
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the user", err);
            }
        });
    }
    suggestionsUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (err) {
                this.responseInterceptor.errorResponse(res, 400, "Failed to remove the user", err);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map