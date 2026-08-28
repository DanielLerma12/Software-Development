"use client";

import { useState } from "react";
import Image from "next/image";
import { type EventData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData;
}

const EditEventModal = ({ isOpen, onClose, event }: EditEventModalProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const timeParts = event.time?.split(" to ") || ["09:00", "17:00"];
  const startTimeParts = timeParts[0]?.split(":") || ["09", "00"];
  const endTimeParts = timeParts[1]?.split(":") || ["17", "00"];
  const [startHour, setStartHour] = useState(startTimeParts[0] || "09");
  const [startMin, setStartMin] = useState(startTimeParts[1] || "00");
  const [endHour, setEndHour] = useState(endTimeParts[0] || "17");
  const [endMin, setEndMin] = useState(endTimeParts[1] || "00");
  const [venue, setVenue] = useState(event.venue);
  const [image, setImage] = useState<File | string | null>(event.image ?? null);
  const [description, setDescription] = useState(event.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", `${startHour}:${startMin} to ${endHour}:${endMin}`);
    formData.append("venue", venue);
    if (image instanceof File) formData.append("image", image);

    try {
      const res = await fetch(`/api/events/${event.slug}`, {
        method: "PATCH",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        const updatedEvent = data.event;
        onClose();

        toast.add({
          title: (
            <span>
              Event:{" "}
              <span className="text-[#59deca] font-bold">
                {updatedEvent.title}
              </span>{" "}
              edited successfully
            </span>
          ),
        });

        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content form-shared"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h1 className="text-4xl font-bold">Edit Event</h1>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="edit-title">Event Title</label>
              <input
                id="edit-title"
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-date">Event Date</label>
                <div className="input-with-icon">
                  <Image
                    src="/icons/calendar.svg"
                    alt="date"
                    width={16}
                    height={16}
                  />
                  <input
                    id="edit-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-start-time">Event Time</label>
                <div className="input-with-icon time-inputs">
                  <Image
                    src="/icons/clock.svg"
                    alt="time"
                    width={16}
                    height={16}
                  />
                  <select
                    id="edit-start-time"
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
                    id="edit-end-time"
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
              <label htmlFor="edit-venue">Event Venue</label>
              <div className="input-with-icon">
                <Image
                  src="/icons/pin.svg"
                  alt="venue"
                  width={16}
                  height={16}
                />
                <input
                  id="edit-venue"
                  type="text"
                  placeholder="Enter venue or online link"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Event Image / Banner</label>
              <label htmlFor="edit-image" className="file-upload">
                <Image
                  src="/icons/arrow-down.svg"
                  alt="upload"
                  width={16}
                  height={16}
                />
                <span>
                  {image instanceof File
                    ? image.name
                    : typeof image === "string"
                      ? image.replace(/^.*[\\/]/, "")
                      : "Upload event image or banner"}
                </span>
                <input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  hidden
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="edit-description">Event Description</label>
              <textarea
                id="edit-description"
                placeholder="Briefly describe the event"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
