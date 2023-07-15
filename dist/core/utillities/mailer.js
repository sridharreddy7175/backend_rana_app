"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const appConfig_1 = require("../../config/appConfig");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(appConfig_1.appConfig.apikey);
const sendEmail = (receiver, source, subject, content) => {
    try {
        const data = {
            to: receiver,
            from: source,
            subject,
            html: content,
        };
        console.log("data---->", data);
        return sgMail.send(data);
    }
    catch (e) {
        console.log("e---->", e);
        return new Error(e);
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map