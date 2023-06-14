import { appConfig } from "../../config/appConfig";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(appConfig.apikey);

export const sendEmail = (receiver, source, subject, content) => {
  try {
    const data = {
      to: receiver,
      from: source,
      subject,
      html: content,
    };
    console.log("data---->",data)
    return sgMail.send(data);
  } catch (e) {
    console.log("e---->",e)
    return new Error(e);
  }
};
