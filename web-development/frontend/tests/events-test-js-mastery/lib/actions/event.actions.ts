"use server";

import connectDB from "../mongodb";
import Event from "@/database/event.model";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    if (!event) return [];

    if (!event.venue) return [];

    return await Event.find({
      _id: { $ne: event._id },
      venue: event.venue,
    })
      .limit(3)
      .lean();
  } catch {
    return [];
  }
};
