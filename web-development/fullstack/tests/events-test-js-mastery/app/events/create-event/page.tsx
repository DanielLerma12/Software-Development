"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/toast";
import { toast } from "@/components/ui/toast";
import Form from "@/components/Form";

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
    if (image instanceof File) formData.append("image", image);

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
