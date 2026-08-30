"use server";

import connectDB from "../mongodb";
import Event from "@/database/event.model";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const createBooking = async ({
  slug,
  email,
}: {
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    const trimmedEmail = email.trim().toLowerCase();

    if (
      process.env.EMAIL_RECIPIENT_1 !== trimmedEmail &&
      process.env.EMAIL_RECIPIENT_2 !== trimmedEmail &&
      process.env.EMAIL_RECIPIENT_3 !== trimmedEmail &&
      process.env.EMAIL_RECIPIENT_4 !== trimmedEmail
    ) {
      return { success: false, message: "Email is not in the database" };
    }

    if (!emailRegex.test(trimmedEmail)) {
      return { success: false, message: "Email is not a valid format" };
    }

    const event = await Event.findOne({ slug });
    if (!event) {
      return { success: false, message: "Event is not valid" };
    }

    await Event.findOneAndUpdate(
      { slug },
      { $addToSet: { attendees: trimmedEmail } },
    );

    return { success: true, message: "" };
  } catch (e) {
    console.error("create booking failed", e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "An unexpected error occurred",
    };
  }
};
