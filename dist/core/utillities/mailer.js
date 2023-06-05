"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maryam72@ethereal.email',
        pass: '37KA1XfbeRdR8FJYm7'
    }
});
//# sourceMappingURL=mailer.js.map