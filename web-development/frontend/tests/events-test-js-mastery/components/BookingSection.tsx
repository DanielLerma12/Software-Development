"use client";

import BookEvent from "@/components/BookEvent";
import { Toaster } from "@/components/ui/toast";

const BookingSection = ({
  slug,
  title,
  date,
  time,
  attendees,
}: {
  slug: string;
  title: string;
  date: string;
  time: string;
  attendees?: string[];
}) => {
  return (
    <aside className="booking">
      <div className="signup-card">
        <h2>Book Your Spot</h2>
        <p className="text-sm">Book your spot and remember to be on time!</p>

        <BookEvent slug={slug} title={title} date={date} time={time} />

        {attendees && attendees.length > 0 && (
          <div className="flex flex-col gap-2">
            {attendees.map((email) => (
              <span key={email} className="event-type-pill">
                {email}
              </span>
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </aside>
  );
};

export default BookingSection;
