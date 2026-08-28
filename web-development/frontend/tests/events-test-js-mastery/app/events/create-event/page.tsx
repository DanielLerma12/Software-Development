"use client";

import { useState } from "react";
import Image from "next/image";
import { Toaster } from "@/components/ui/toast";
import { toast } from "@/components/ui/toast";

const CreateEventPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("09");
  const [startMin, setStartMin] = useState("00");
  const [endHour, setEndHour] = useState("17");
  const [endMin, setEndMin] = useState("00");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", `${startHour}:${startMin} to ${endHour}:${endMin}`);
    formData.append("venue", venue);

    if (image) formData.append("image", image);

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
        setDate("");
        setVenue("");
        setDescription("");
        setImage(null);
        setStartHour("09");
        setStartMin("00");
        setEndHour("17");
        setEndMin("00");
      } else {
        console.error("API error:", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="create-event" className="form-shared">
      <h1 className="text-4xl font-bold;">Create an Event</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Event Date</label>
              <div className="input-with-icon">
                <Image
                  src="/icons/calendar.svg"
                  alt="date"
                  width={16}
                  height={16}
                />
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="start-time">Event Time</label>
              <div className="input-with-icon time-inputs">
                <Image
                  src="/icons/clock.svg"
                  alt="time"
                  width={16}
                  height={16}
                />
                <select
                  id="start-time"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  required
                >
                  {Array.from({ length: 24 }, (_, i) =>
                    String(i).padStart(2, "0"),
                  ).map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <span className="time-separator">:</span>
                <select
                  value={startMin}
                  onChange={(e) => setStartMin(e.target.value)}
                  required
                >
                  {[
                    "00",
                    "05",
                    "10",
                    "15",
                    "20",
                    "25",
                    "30",
                    "35",
                    "40",
                    "45",
                    "50",
                    "55",
                  ].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <span className="time-separator">to</span>
                <select
                  id="end-time"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  required
                >
                  {Array.from({ length: 24 }, (_, i) =>
                    String(i).padStart(2, "0"),
                  ).map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <span className="time-separator">:</span>
                <select
                  value={endMin}
                  onChange={(e) => setEndMin(e.target.value)}
                  required
                >
                  {[
                    "00",
                    "05",
                    "10",
                    "15",
                    "20",
                    "25",
                    "30",
                    "35",
                    "40",
                    "45",
                    "50",
                    "55",
                  ].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="venue">Event Venue</label>
            <div className="input-with-icon">
              <Image src="/icons/pin.svg" alt="venue" width={16} height={16} />
              <input
                id="venue"
                type="text"
                placeholder="Enter venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Event Image / Banner</label>
            <label htmlFor="image" className="file-upload">
              <Image
                src="/icons/arrow-down.svg"
                alt="upload"
                width={16}
                height={16}
              />
              <span>{image ? image.name : "Upload event image or banner"}</span>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                hidden
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              placeholder="Briefly describe the event"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Saving..." : "Save Event"}
          </button>
        </form>
      </div>
      <Toaster />
    </section>
  );
};

export default CreateEventPage;
