"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { toast } from "@/components/ui/toast";
import { useState, useSyncExternalStore } from "react";

function parseTime(t: string): { hours: number; minutes: number } | null {
  if (!t) return null;
  const match = t.trim().match(/^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[4]?.toUpperCase();
  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
}

function parseDate(
  dateStr: string,
): { year: number; month: number; day: number } | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  const matchIso = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (matchIso) {
    return {
      year: parseInt(matchIso[1], 10),
      month: parseInt(matchIso[2], 10) - 1,
      day: parseInt(matchIso[3], 10),
    };
  }
  const matchLocal = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (matchLocal) {
    return {
      year: parseInt(matchLocal[3], 10),
      month: parseInt(matchLocal[2], 10) - 1,
      day: parseInt(matchLocal[1], 10),
    };
  }
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate(),
    };
  }
  return null;
}

function isEventExpired(dateStr: string, timeStr: string): boolean {
  const d = parseDate(dateStr);
  if (!d) return false;

  const timeParts = (timeStr || "").split(/\s+to\s+/i);
  // El evento caduca después de que termina (end time), o de su hora de inicio si solo tiene una
  const targetTimePart = timeParts[1] || timeParts[0];
  const t = parseTime(targetTimePart);

  const eventDateTime = new Date(
    d.year,
    d.month,
    d.day,
    t ? t.hours : 23,
    t ? t.minutes : 59,
    0,
  );
  return eventDateTime.getTime() <= Date.now();
}

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const BookEvent = ({
  slug,
  title,
  date,
  time,
}: {
  slug: string;
  title: string;
  date: string;
  time: string;
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isClient = useIsClient();

  const expired = isClient ? isEventExpired(date, time) : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success, message } = await createBooking({ slug, email });

    if (success) {
      toast.add({
        title: (
          <span>
            Email: <span className="text-[#59deca] font-bold">{email}</span>{" "}
            registered correctly in the event:{" "}
            <span className="text-[#59deca] font-bold">{title}</span>
          </span>
        ),
      });
      setSubmitted(true);
    } else {
      toast.add({
        title: `${message}. Please try again.`,
        type: "error",
      });
    }
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Adress</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder={
                expired
                  ? "Event expired :("
                  : "Enter your email address"
              }
              autoComplete="off"
              disabled={expired}
            ></input>
          </div>

          <button
            type="submit"
            className="button-submit"
            disabled={expired}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
