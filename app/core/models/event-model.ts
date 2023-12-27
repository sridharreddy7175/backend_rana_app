import { model, Schema, Document } from "mongoose";

interface IEvents extends Document {
  title: string;
  poster: string;
  ticketNo: string;
  orderNo: string;
  date: any;
  addresses:any;
  description:any;
  tickets:number;
}

const eventSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    ticketNo: {
      type: String,
    },
    orderNo: {
      type: String,
    },
    date: {
      type: Date,
    },
    addresses: [
      {
        city: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        zipCode: {
          type: Number,
        },
        addressType: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
    },
    tickets: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const EventModel = model<IEvents>("EventModel", eventSchema);
