import nodemailer from "nodemailer";
import { config } from "../config";

const mailerconfig = config.mailer;

const transporter = nodemailer.createTransport({
  host: mailerconfig.host,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: mailerconfig.user,
    pass: mailerconfig.password,
  },
});

export const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  html: string,
  attachments?: { filename: string; content: Buffer }[]
) => {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });
  } catch (error) {
    throw new Error("Error lors de l'envoie de l'email.");
  }
};
