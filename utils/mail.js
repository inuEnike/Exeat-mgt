import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ochinyabostella@gmail.com",
    pass: "bexd azkr wwjc ijza",
  },
});
