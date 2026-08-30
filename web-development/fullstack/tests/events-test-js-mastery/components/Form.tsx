"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import type { DatePickerProps } from "react-datepicker";

const DatePicker = dynamic(
  () =>
    import("react-datepicker") as unknown as Promise<{
      default: React.ComponentType<DatePickerProps>;
    }>,
  { ssr: false },
);

const HOURS_12 = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const MINUTES = [
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
];

interface FormProps {
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  title: string;
  setTitle: (v: string) => void;
  eventType: string[];
  setEventType: (v: string[]) => void;
  date: Date | null;
  setDate: (d: Date | null) => void;
  startHour: string;
  setStartHour: (v: string) => void;
  startMin: string;
  setStartMin: (v: string) => void;
  startPeriod: string;
  setStartPeriod: (v: string) => void;
  endHour: string;
  setEndHour: (v: string) => void;
  endMin: string;
  setEndMin: (v: string) => void;
  endPeriod: string;
  setEndPeriod: (v: string) => void;
  venue: string;
  setVenue: (v: string) => void;
  image: File | string | null;
  setImage: (v: File | string | null) => void;
  description: string;
  setDescription: (v: string) => void;
}

const Form = ({
  submitting,
  onSubmit,
  submitLabel,
  title,
  setTitle,
  eventType,
  setEventType,
  date,
  setDate,
  startHour,
  setStartHour,
  startMin,
  setStartMin,
  startPeriod,
  setStartPeriod,
  endHour,
  setEndHour,
  endMin,
  setEndMin,
  endPeriod,
  setEndPeriod,
  venue,
  setVenue,
  image,
  setImage,
  description,
  setDescription,
}: FormProps) => {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            value=""
            onChange={(e) => {
              const val = e.target.value;
              if (val && !eventType.includes(val)) {
                setEventType([...eventType, val]);
              }
            }}
            required={eventType.length === 0}
          >
            <option value="" hidden>
              Select event type
            </option>
            <option value="Amusement Park">Amusement Park</option>
            <option value="Bike Riding">Bike Riding</option>
            <option value="Bowling">Bowling</option>
            <option value="Cinema">Cinema</option>
            <option value="Dining">Dining</option>
            <option value="Filming">Filming</option>
            <option value="Football">Football</option>
            <option value="Walking">Walking</option>
          </select>
          {eventType.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {eventType.map((type) => (
                <span
                  key={type}
                  className="event-type-pill flex items-center gap-1"
                >
                  {type}
                  <button
                    type="button"
                    onClick={() =>
                      setEventType(eventType.filter((t) => t !== type))
                    }
                    className="text-light-200 hover:text-white text-xs font-bold ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Event Date</label>
          <div className="input-with-icon date-picker-wrapper">
            <Image
              src="/icons/calendar.svg"
              alt="date"
              width={16}
              height={16}
            />
            <DatePicker
              id="date"
              selected={date}
              onChange={(d: Date | null) => setDate(d)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
              autoComplete="off"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="start-time">Event Time</label>
          <div className="input-with-icon time-inputs">
            <Image src="/icons/clock.svg" alt="time" width={16} height={16} />
            <select
              id="start-time"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              required
            >
              {HOURS_12.map((h) => (
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
              {MINUTES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={startPeriod}
              onChange={(e) => setStartPeriod(e.target.value)}
              required
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <span className="time-separator">to</span>
            <select
              id="end-time"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              required
            >
              {HOURS_12.map((h) => (
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
              {MINUTES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={endPeriod}
              onChange={(e) => setEndPeriod(e.target.value)}
              required
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="venue">Event Venue</label>
          <div className="input-with-icon">
            <Image src="/icons/pin.svg" alt="venue" width={16} height={16} />
            <input
              id="venue"
              type="text"
              placeholder="Enter venue or online link"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              autoComplete="off"
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
            <span>
              {image instanceof File
                ? image.name
                : typeof image === "string"
                  ? image.replace(/^.*[\\/]/, "")
                  : "Upload event image or banner"}
            </span>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              hidden
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
          {submitting ? "Saving..." : submitLabel}
        </button>
      </form>
    </div>
  );
};

export default Form;
