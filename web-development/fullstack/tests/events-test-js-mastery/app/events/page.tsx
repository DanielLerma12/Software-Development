import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { type EventData } from "@/lib/types";
import EditButton from "@/components/EditButton";
import DeleteButton from "@/components/DeleteButton";
import { Toaster } from "@/components/ui/toast";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

const PAGE_SIZE = 10;

const HandlerAllEvents = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  return (
    <Suspense fallback={<div className="text-center">Loading Events...</div>}>
      <AllEvents searchParams={searchParams} />
    </Suspense>
  );
};

const AllEvents = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  let events: Array<
    EventData & { attendees?: string[] }
  > = [];
  try {
    await connectDB();
    const rawEvents = await Event.find()
      .sort({ createdAt: -1 })
      .lean();
    events = rawEvents.map((e) => ({
      title: e.title,
      slug: e.slug,
      description: e.description,
      image: e.image,
      venue: e.venue,
      date: e.date,
      time: e.time,
      eventType: e.eventType,
      attendees: e.attendees,
    }));
  } catch (e) {
    console.error("Failed to fetch events:", e);
  }

  const totalCount: number = events?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagedEvents = events?.slice(start, start + PAGE_SIZE) ?? [];

  return (
    <section id="events-management">
      <div className="events-header">
        <h1>Event Management</h1>
      </div>
      {pagedEvents.length > 0 ? (
        <div className="events-table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>Events</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Booked spot</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedEvents.map((event) => (
                <tr key={event.slug}>
                  <td className="event-name-cell">
                    <Link
                      href={`/events/${event.slug}`}
                      className="event-name-link"
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={40}
                        height={40}
                        className="event-thumbnail"
                      />
                      <span>{event.title}</span>
                    </Link>
                  </td>

                  <td>{event.venue}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>
                    {event.attendees && event.attendees.length > 0
                      ? event.attendees
                          .map((attendee) => {
                            return attendee.split("@")[0];
                          })
                          .join(", ")
                      : "—"}
                  </td>
                  <td className="actions-cell">
                    <EditButton event={event} />
                    <span className="action-divider">|</span>
                    <DeleteButton event={event} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="text-center mt-20">There are no events</h2>
      )}

      <div className="pagination">
        <Link
          href={`/events?page=${safePage - 1}`}
          className={`pagination-btn ${safePage <= 1 ? "disabled" : ""}`}
          aria-disabled={safePage <= 1}
        >
          Previous
        </Link>
        <span className="pagination-info">
          Page {safePage} of {totalPages}
        </span>
        <Link
          href={`/events?page=${safePage + 1}`}
          className={`pagination-btn ${safePage >= totalPages ? "disabled" : ""}`}
          aria-disabled={safePage >= totalPages}
        >
          Next
        </Link>
      </div>
      <Toaster />
    </section>
  );
};

export default HandlerAllEvents;
