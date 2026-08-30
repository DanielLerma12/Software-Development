"use client";

import { useState } from "react";
import { type EventData } from "@/lib/types";
import { useRouter } from "next/navigation";
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

function parseTime(time: string): { hour: string; min: string; period: string } {
  const timePart = time.trim();

  if (timePart.toUpperCase().includes("AM") || timePart.toUpperCase().includes("PM")) {
    const period = timePart.toUpperCase().includes("AM") ? "AM" : "PM";
    const parts = timePart.replace(/[AP]M/i, "").trim().split(":");
    return { hour: parts[0] || "9", min: parts[1] || "00", period };
  }

  const [h, m] = timePart.split(":");
  const hour24 = parseInt(h || "0", 10);
  if (hour24 === 0) return { hour: "12", min: m || "00", period: "AM" };
  if (hour24 < 12) return { hour: String(hour24), min: m || "00", period: "AM" };
  if (hour24 === 12) return { hour: "12", min: m || "00", period: "PM" };
  return { hour: String(hour24 - 12), min: m || "00", period: "PM" };
}

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData;
}

const EditEventModal = ({ isOpen, onClose, event }: EditEventModalProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [eventType, setEventType] = useState<string[]>(
    event.eventType ? event.eventType.split(", ") : [],
  );
  const [date, setDate] = useState<Date | null>(() => {
    if (event.date) {
      const parts = event.date.split("-");
      if (parts.length === 3) {
        return new Date(
          Number(parts[0]),
          Number(parts[1]) - 1,
          Number(parts[2]),
        );
      }
      const d = new Date(event.date);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  });

  const timeParts = event.time?.split(" to ") || ["9:00 AM", "5:00 PM"];
  const parsedStart = parseTime(timeParts[0] || "9:00 AM");
  const parsedEnd = parseTime(timeParts[1] || "5:00 PM");

  const [startHour, setStartHour] = useState(parsedStart.hour);
  const [startMin, setStartMin] = useState(parsedStart.min);
  const [startPeriod, setStartPeriod] = useState(parsedStart.period);
  const [endHour, setEndHour] = useState(parsedEnd.hour);
  const [endMin, setEndMin] = useState(parsedEnd.min);
  const [endPeriod, setEndPeriod] = useState(parsedEnd.period);
  const [venue, setVenue] = useState(event.venue);
  const [image, setImage] = useState<File | string | null>(event.image ?? null);
  const [description, setDescription] = useState(event.description);

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
      } else {
        const data = await res.json();
        toast.add({
          title: data.message || "Failed to update event",
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

        <Form
          submitting={submitting}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
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
      </div>
    </div>
  );
};

export default EditEventModal;