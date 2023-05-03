import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  accountType: boolean;
  phone: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  accountType: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

export const UserModel = model<IUser>("UserModel", userSchema);
