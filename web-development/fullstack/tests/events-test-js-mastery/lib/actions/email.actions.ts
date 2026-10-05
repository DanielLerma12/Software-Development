"use server";

import nodemailer from "nodemailer";
import { type IEvent } from "@/database/event.model";

export const getRegisteredEmails = async (): Promise<string[]> => {
  const dynamicKeys = Object.keys(process.env)
    .filter((k) => k.startsWith("EMAIL_RECIPIENT_"))
    .sort();
  const emails = new Set<string>();

  for (const key of dynamicKeys) {
    const val = process.env[key]?.trim().toLowerCase();
    if (val) emails.add(val);
  }

  // Fallback to explicit env references in case of bundler optimization
  const fallback = [
    process.env.EMAIL_RECIPIENT_1,
    process.env.EMAIL_RECIPIENT_2,
    process.env.EMAIL_RECIPIENT_3,
    process.env.EMAIL_RECIPIENT_4,
    process.env.EMAIL_RECIPIENT_5,
  ];
  for (const f of fallback) {
    if (f?.trim()) emails.add(f.trim().toLowerCase());
  }

  return Array.from(emails);
};

interface SendNotificationOptions {
  event: IEvent;
  recipients: string[];
  isUpdate?: boolean;
}

export const sendEventNotificationEmail = async ({
  event,
  recipients,
  isUpdate = false,
}: SendNotificationOptions) => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASSWORD;

  if (!user || !pass) {
    console.error("GMAIL_USER or GMAIL_PASSWORD not configured");
    return;
  }

  const registered = await getRegisteredEmails();
  const validRecipients = recipients
    .map((r) => r.trim().toLowerCase())
    .filter((r) => registered.includes(r));

  if (validRecipients.length === 0) {
    console.log("No valid email recipients selected, skipping email send.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const rawBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");
  const eventUrl = `${baseUrl}/events/${event.slug}`;
  const subject = isUpdate
    ? `Event Updated: ${event.title}`
    : `New Event: ${event.title}`;

  try {
    await transporter.sendMail({
      from: `"Events: The Band" <${user}>`,
      to: validRecipients,
      subject,
      html: `
        <h1>${event.title}</h1>
        ${
          isUpdate
            ? '<p style="color:#59deca;font-weight:600;">The event details have been updated:</p>'
            : ""
        }
        <p><strong>Type:</strong> ${event.eventType}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
        <p>${event.description}</p>
        <br />
        <a href="${eventUrl}" style="background-color:#59deca;color:#000;padding:10px 20px;text-decoration:none;border-radius:6px;font-weight:600;">View Event Details</a>
      `,
    });
    console.log(
      `Email sent successfully to [${validRecipients.join(", ")}] for event:`,
      event.title,
    );
  } catch (err) {
    console.error("Failed to send event notification email:", err);
  }
};

export const sendEventCreatedEmail = async (
  event: IEvent,
  recipients?: string[],
) => {
  if (recipients && recipients.length > 0) {
    return sendEventNotificationEmail({
      event,
      recipients,
      isUpdate: false,
    });
  }
};
