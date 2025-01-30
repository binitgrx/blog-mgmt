const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICES,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async ({ to, subject, message }) => {
  const info = await transporter.sendMail({
    from: `"BlogQuill" <${process.env.SMTP_USERNAME}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html: message, // html body
  });
  return info?.messageId;
};

module.exports ={sendMail}