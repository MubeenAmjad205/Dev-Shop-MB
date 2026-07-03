import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

// Synchronous MongoClient creation natively supported by Node driver
const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/devshop");
const db = client.db();

// Configure Nodemailer for Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {  
        enabled: true,
        // Reset password flow via Gmail SMTP
        sendResetPassword: async (data) => {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                to: data.user.email,
                subject: "Reset your password",
                html: `<p>Click <a href="${data.url}">here</a> to reset your password.</p>`,
            });
        }
    },
    user: {
        // Extend schema to capture Phone Number on Signup
        additionalFields: {
            phoneNumber: {
                type: "string",
                required: false // Allow optional so standard email flows don't break, but UI can enforce it
            }
        }
    }
});
