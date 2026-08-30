import { Schema, model, models, Document } from "mongoose";
import { type EventData } from "@/lib/types";

// TypeScript interface for Event document
export interface IEvent extends Document, EventData {
  createdAt: Date;
  updatedAt: Date;
  attendees: string[];
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
    },
    attendees: {
      type: [String],
      default: [],
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  },
);

// Pre-save hook for slug generation and data normalization
EventSchema.pre("save", function () {
  // Generate slug only if title changed or document is new
  if (this.isModified("title") || this.isNew) {
    this.slug = generateSlug(this.title);
  }

  // Normalize date to ISO format if it's not already
  if (this.isModified("date")) {
    this.date = normalizeDate(this.date);
  }

  // Normalize time format (HH:MM)
  if (this.isModified("time")) {
    this.time = normalizeTime(this.time);
  }
});

// Helper function to generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

// Helper function to normalize date to ISO format
function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  return date.toISOString().split("T")[0]; // Return YYYY-MM-DD format
}

// Helper function to normalize time format
function normalizeTime(timeString: string): string {
  const parts = timeString.split(/\s+to\s+/i).map((p) => p.trim());
  if (parts.length === 2) {
    return `${normalizeSingleTime(parts[0])} to ${normalizeSingleTime(parts[1])}`;
  }
  return normalizeSingleTime(timeString);
}

function normalizeSingleTime(time: string): string {
  const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
  const match = time.match(timeRegex);

  if (!match) {
    throw new Error("Invalid time format. Use HH:MM or HH:MM AM/PM");
  }

  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[4]?.toUpperCase();

  if (period) {
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  }

  if (
    hours < 0 ||
    hours > 23 ||
    parseInt(minutes) < 0 ||
    parseInt(minutes) > 59
  ) {
    throw new Error("Invalid time values");
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

// Create index for common queries
EventSchema.index({ date: 1 });
EventSchema.index({ eventType: 1 });

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
