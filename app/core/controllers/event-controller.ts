import { EventModel } from "../models/event-model";
import { ResponseInterceptor } from "../utillities/response-interceptor";

export interface IAddress {
  _id?: string;
  city: string;
  address1: string;
  address2: string;
  zipCode: string;
  to: string;
  current: boolean;
  description: string;
}

export class EventController {
  eventModel: typeof EventModel;
  responseInterceptor: ResponseInterceptor;
  constructor() {
    this.eventModel = EventModel;
    this.responseInterceptor = new ResponseInterceptor();
  }

  async createEvent(req, res) {
    try {
      const eventData: any = req.body;
      // save to db
      let events = new this.eventModel({
        title: eventData.title,
        poster: req.file.originalname,
        ticketNo: eventData.ticketNo,
        orderNo: eventData.orderNo,
        date: eventData.date,
        addresses: [] as IAddress[],
        description: eventData.description,
        tickets: eventData.tickets,
      });
      events = await events.save();
      return this.responseInterceptor.successResponse(
        req,
        res,
        null,
        "Events Successfully Created",
        { events_id: events._id }
      );
    } catch (err) {
      return this.responseInterceptor.errorResponse(
        res,
        500,
        "Something went wrong",
        err
      );
    }
  }
  async addedEvent(req, res) {
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
}
