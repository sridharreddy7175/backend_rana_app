import { model, Schema, Document } from "mongoose";
const mongoose = require("mongoose");

interface IConfigModel extends Document {
  roleName: string;
  displayName: string;
  roleDescription: string;
  status: number;
}

const ConfigSchema: Schema = new Schema(
  {
    key: {
      type: String,
    },
    value:{
        type:Object
    }
  },
  { timestamps: true }
);

export const ConfigModel = model<IConfigModel>("ConfigModel", ConfigSchema);
