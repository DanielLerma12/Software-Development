import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

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

    const event = {
      title: formData.get("title"),
      description: formData.get("description"),
      overview: formData.get("overview"),
      venue: formData.get("venue"),
      location: formData.get("location"),
      date: formData.get("date"),
      time: formData.get("time"),
      mode: formData.get("mode"),
      audience: formData.get("audience"),
      agenda: formData
        .get("agenda")
        ?.toString()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      organizer: formData.get("organizer"),
      tags: formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image: imageUrl,
    };

    const createdEvent = await Event.create(event);

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
