"use server";

import nodemailer from "nodemailer";
import { type IEvent } from "@/database/event.model";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const RECIPIENTS = [
  process.env.EMAIL_RECIPIENT_1,
  process.env.EMAIL_RECIPIENT_2,
  process.env.EMAIL_RECIPIENT_3,
].filter(Boolean) as string[];

export const sendEventCreatedEmail = async (event: IEvent) => {
  if (RECIPIENTS.length === 0) {
    console.warn("No email recipients configured, skipping email send.");
    return;
  }

  const eventUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/events/${event.slug}`;

  try {
    await transporter.sendMail({
      from: `"Events: The Band" <${process.env.GMAIL_USER}>`,
      to: RECIPIENTS,
      subject: `New Event: ${event.title}`,
      html: `
        <h1>${event.title}</h1>
        <p><strong>Type:</strong> ${event.eventType}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
        <p>${event.description}</p>
        <br />
        <a href="${eventUrl}" style="background-color:#59deca;color:#000;padding:10px 20px;text-decoration:none;border-radius:6px;font-weight:600;">View Event Details</a>
      `,
    });
  } catch (err) {
    console.error("Failed to send event creation email:", err);
  }
};
