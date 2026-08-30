"use server";

import connectDB from "../mongodb";
import Event from "@/database/event.model";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    if (!event) return [];

    if (!event.eventType) return [];

    const types = event.eventType.split(", ").filter(Boolean);
    if (types.length === 0) return [];

    const regex = new RegExp(types.map(escapeRegExp).join("|"), "i");

    return await Event.find({
      _id: { $ne: event._id },
      eventType: regex,
    })
      .limit(3)
      .lean();
  } catch {
    return [];
  }
};
