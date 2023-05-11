import * as nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maryam72@ethereal.email',
        pass: '37KA1XfbeRdR8FJYm7'
    }
})