const nodemailer = require("nodemailer");
const mailerconfig = require("../config").mailer;

const transporter = nodemailer.createTransport({
  host: mailerconfig.host,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: mailerconfig.user,
    pass: mailerconfig.password,
  },
});

const sendEmail = async (from, to, subject, html) => {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  } catch (error) {
    throw new Error("Error lors de l'envoie de l'email.");
  }
};

module.exports = sendEmail;
