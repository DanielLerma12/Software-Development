import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import BookingSection from "@/components/BookingSection";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import SimilarEventsToggle from "@/components/SimilarEventsToggle";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image
      src={icon}
      alt={alt}
      width={17}
      height={17}
      style={{ width: "auto", height: "auto" }}
    />
    <p>{label}</p>
  </div>
);

const HandlerEventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <Suspense fallback={<div className="text-center">Loading Event...</div>}>
      <EventDetails params={params} />
    </Suspense>
  );
};

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  let event;
  try {
    await connectDB();
    event = await Event.findOne({ slug }).lean();
  } catch (e) {
    console.error("Failed to fetch event:", e);
    notFound();
  }

  if (!event) return notFound();

  const {
    title,
    description,
    image,
    date,
    time,
    venue,
    eventType,
    attendees,
  } = event;

  const similarEvents = JSON.parse(
    JSON.stringify(await getSimilarEventsBySlug(slug)),
  );

  return (
    <section id="event">
      <div className="header">
        <h1>{title}</h1>
      </div>

      <div className="details">
        <div className="content">
          <div className="event-top-row">
            <div className="banner-wrapper">
              <Image
                src={image}
                alt="Event Banner"
                width={410}
                height={300}
                className="banner"
              />
            </div>
            <div className="event-info-side">
              <section className="flex-col-gap-2">
                <h2>Event Details</h2>
                <EventDetailItem
                  icon="/icons/calendar.svg"
                  alt="calendar"
                  label={date}
                />
                <EventDetailItem
                  icon="/icons/clock.svg"
                  alt="time"
                  label={time}
                />
                <EventDetailItem
                  icon="/icons/pin.svg"
                  alt="venue"
                  label={venue}
                />
              </section>
              {eventType && (
                <div className="flex flex-wrap gap-2">
                  {eventType
                    .split(", ")
                    .filter(Boolean)
                    .map((type: string) => (
                      <span key={type} className="event-type-pill">
                        {type}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>
          <section className="flex-col-gap-2">
            <h2>Description</h2>
            <p>{description}</p>
          </section>
        </div>
        <BookingSection
          slug={slug}
          title={title}
          date={date}
          time={time}
          attendees={attendees}
        />
      </div>

      <SimilarEventsToggle similarEvents={similarEvents} />
    </section>
  );
};

export default HandlerEventDetails;
