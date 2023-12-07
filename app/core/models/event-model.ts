import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  heroName: string;
  email: string;
  password: string;
  accountType: boolean;
  phone: string;
}

const eventSchema: Schema = new Schema({
  heroName: {
    type: String,
    required: true,
  },
  eventPoster: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  description: {
    type: Boolean,
    default: false,
  },
  tickets: {
    type: Number,
    required: true,
  },
},{timestamps:true});

export const EventSchema = model<IUser>("EventModel", eventSchema);
