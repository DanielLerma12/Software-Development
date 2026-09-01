import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    const event = await Event.findOneAndDelete({ slug });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const { title } = event;

    return NextResponse.json({ title }, { status: 200 });
  } catch (e) {
    console.error("DELETE /api/events error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to fetch events", error: message },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params; // slug viejo (viene de la URL)

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    const formData = await request.formData();

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

    const existing = await Event.findOne({ slug });
    if (!existing) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Imagen: si llega archivo nuevo, subir a Cloudinary; si no, conservar la actual
    const file = formData.get("image") as File | null;
    let imageUrl = existing.image;

    if (file && file.size > 0) {
      try {
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
        imageUrl = (uploadResult as { secure_url: string }).secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        return NextResponse.json(
          { message: "Failed to upload image. Please try again." },
          { status: 422 },
        );
      }
    }

    const newTitle =
      (formData.get("title") as string)?.trim() || existing.title;

    existing.set({
      title: newTitle,
      // Nota: no se pasa 'slug' a propósito. El pre("save") del modelo
      // regenera el slug automáticamente al cambiar el título.
      description: formData.get("description") || existing.description,
      date: formData.get("date") || existing.date,
      time: formData.get("time") || existing.time,
      venue: formData.get("venue") || existing.venue,
      eventType: formData.get("eventType") || existing.eventType,
      image: imageUrl,
    });

    try {
      await existing.save(); // dispara pre("save") y valida unique del slug
    } catch (err) {
      if (err instanceof Error && err.message.includes("duplicate key")) {
        return NextResponse.json(
          { message: "An event with that title/slug already exists" },
          { status: 400 },
        );
      }
      throw err;
    }

    return NextResponse.json({ event: existing }, { status: 200 });
  } catch (e) {
    console.error("PATCH /api/events error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to update event", error: message },
      { status: 500 },
    );
  }
}
