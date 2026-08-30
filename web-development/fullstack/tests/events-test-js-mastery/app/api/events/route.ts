import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { sendEventCreatedEmail } from "@/lib/actions/email.actions";

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json({ events }, { status: 200 });
  } catch (e) {
    console.error("GET /api/events error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to fetch events", error: message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const venue = formData.get("venue");
    const date = formData.get("date");
    const time = formData.get("time");
    const eventType = formData.get("eventType");

    // validaciones

    // vacios
    if (
      title === "" ||
      description === "" ||
      venue === "" ||
      date === "" ||
      time === "" ||
      eventType === ""
    ) {
      return NextResponse.json(
        { message: "All the fields are required" },
        { status: 400 },
      );
    }

    const file = formData.get("image") as File;

    if (!file)
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);

            resolve(results);
          },
        )
        .end(buffer);
    });

    const imageUrl = (uploadResult as { secure_url: string }).secure_url;

    const getString = (key: string) => {
      const value = formData.get(key);

      if (typeof value !== "string") {
        throw new Error(`${key} is required`);
      }

      return value;
    };

    const event = {
      title: getString("title"),
      description: getString("description"),
      venue: getString("venue"),
      date: getString("date"),
      time: getString("time"),
      eventType: getString("eventType"),
      image: imageUrl,
    };

    const createdEvent = await Event.create(event);

    await sendEventCreatedEmail(createdEvent);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error("POST /api/events error:", e);

    const message = e instanceof Error ? e.message : "Unknown error";

    if (message.includes("MONGODB_URI")) {
      return NextResponse.json({ message }, { status: 500 });
    }

    if (message.includes("validation") || message.includes("Validation")) {
      return NextResponse.json({ message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Event creation failed", error: message },
      { status: 500 },
    );
  }
}
