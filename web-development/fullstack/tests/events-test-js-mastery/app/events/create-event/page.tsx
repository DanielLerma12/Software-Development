"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/toast";
import { toast } from "@/components/ui/toast";
import Form from "@/components/Form";

const MAX_SIZE = 1200;

const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height = Math.round((height / width) * MAX_SIZE);
          width = MAX_SIZE;
        } else {
          width = Math.round((width / height) * MAX_SIZE);
          height = MAX_SIZE;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          const compressed = new File([blob!], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(compressed);
        },
        "image/jpeg",
        0.8,
      );
    };

    img.src = url;
  });
};

const CreateEventPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [startHour, setStartHour] = useState("6");
  const [startMin, setStartMin] = useState("30");
  const [startPeriod, setStartPeriod] = useState("PM");
  const [endHour, setEndHour] = useState("9");
  const [endMin, setEndMin] = useState("30");
  const [endPeriod, setEndPeriod] = useState("PM");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("eventType", eventType.join(", "));
    formData.append("description", description);
    formData.append(
      "date",
      date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
        : "",
    );
    formData.append(
      "time",
      `${startHour}:${startMin} ${startPeriod} to ${endHour}:${endMin} ${endPeriod}`,
    );
    formData.append("venue", venue);
    if (image instanceof File) {
      const compressed = await compressImage(image);
      formData.append("image", compressed);
    }

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.add({
          title: (
            <span>
              Event:{" "}
              <span className="text-[#59deca] font-bold">
                {data.event.title}
              </span>{" "}
              created successfully
            </span>
          ),
        });

        setTitle("");
        setDate(null);
        setVenue("");
        setDescription("");
        setImage(null);
        setEventType([]);
        setStartHour("6");
        setStartMin("30");
        setStartPeriod("PM");
        setEndHour("10");
        setEndMin("30");
        setEndPeriod("PM");
      } else {
        toast.add({
          title: data.message || "Failed to create event",
          type: "error",
        });
      }
    } catch {
      toast.add({
        title: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="create-event" className="form-shared">
      <h1 className="text-4xl font-bold">Create an Event</h1>

      <Form
        submitting={submitting}
        onSubmit={handleSubmit}
        submitLabel="Save Event"
        title={title}
        setTitle={setTitle}
        eventType={eventType}
        setEventType={setEventType}
        date={date}
        setDate={setDate}
        startHour={startHour}
        setStartHour={setStartHour}
        startMin={startMin}
        setStartMin={setStartMin}
        startPeriod={startPeriod}
        setStartPeriod={setStartPeriod}
        endHour={endHour}
        setEndHour={setEndHour}
        endMin={endMin}
        setEndMin={setEndMin}
        endPeriod={endPeriod}
        setEndPeriod={setEndPeriod}
        venue={venue}
        setVenue={setVenue}
        image={image}
        setImage={setImage}
        description={description}
        setDescription={setDescription}
      />

      <Toaster />
    </section>
  );
};

export default CreateEventPage;
