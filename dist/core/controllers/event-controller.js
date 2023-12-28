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
exports.EventController = void 0;
const event_model_1 = require("../models/event-model");
const response_interceptor_1 = require("../utillities/response-interceptor");
class EventController {
    constructor() {
        this.eventModel = event_model_1.EventModel;
        this.responseInterceptor = new response_interceptor_1.ResponseInterceptor();
    }
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventData = req.body;
                // save to db
                let events = new this.eventModel({
                    title: eventData.title,
                    poster: req.file.originalname,
                    ticketNo: eventData.ticketNo,
                    orderNo: eventData.orderNo,
                    date: eventData.date,
                    addresses: [],
                    description: eventData.description,
                    tickets: eventData.tickets,
                });
                events = yield events.save();
                return this.responseInterceptor.successResponse(req, res, null, "Events Successfully Created", { events_id: events._id });
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
    addedEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (err) {
                return this.responseInterceptor.errorResponse(res, 500, "Something went wrong", err);
            }
        });
    }
}
exports.EventController = EventController;
//# sourceMappingURL=event-controller.js.map