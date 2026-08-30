import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { type IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const HandlerPage = async () => {
  return (
    <Suspense fallback={<div className="text-center">Loading Home...</div>}>
      <Page />
    </Suspense>
  );
};

const Page = async () => {
  let events: IEvent[] = [];
  try {
    await connectDB();
    events = await Event.find().sort({ createdAt: -1 }).lean();
  } catch (e) {
    console.error("Failed to fetch events:", e);
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-center">
          The Hub for Every Meeting <br /> With the Band
        </h1>
        <p className="text-center mt-8">
          Meetups, Dining, Movies & Filming Sessions
        </p>

        <ExploreBtn />
      </section>

      <section id="events" className="space-y-7">
        {events && events.length > 0 ? (
          <>
            <h3>Featured Events</h3>
            <ul className="events">
              {events.map((event: IEvent) => (
                <li key={event.title} className="list-none">
                  <EventCard {...event} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-center">There are no events</p>
        )}
      </section>
    </>
  );
};

export default HandlerPage;
