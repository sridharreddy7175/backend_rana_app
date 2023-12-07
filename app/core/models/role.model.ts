import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");

interface IRole extends Document {
  roleName: string;
  displayName: string;
  roleDescription: string;
  status: number;
}

const RoleSchema: Schema = new Schema(
  {
    roleName: {
      type: String,
    },
    displayName: {
      type: String,
      required: true,
    },
    roleDescription: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
    },
    status:{
      type: Boolean
    }
  },
  { timestamps: true }
);

export const RoleModel = model<IRole>("RoleModel", RoleSchema);
