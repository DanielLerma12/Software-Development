"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import EventCard from "@/components/EventCard";
import { type IEvent } from "@/database/event.model";

const SimilarEventsToggle = ({
  similarEvents,
}: {
  similarEvents: IEvent[];
}) => {
  const [show, setShow] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!show) {
      setShow(true);
      setTimeout(() => {
        eventsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      const onScrollEnd = () => {
        window.removeEventListener("scrollend", onScrollEnd);
        setShow(false);
      };
      window.addEventListener("scrollend", onScrollEnd);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 pt-25">
      <button
        id="explore-btn"
        className="flex items-center gap-2"
        onClick={toggle}
      >
        {show ? "Hide Similar Events" : "Show Similar Events"}
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
          className={`w-6 h-6 invert transition-transform ${show ? "rotate-180" : ""}`}
        />
      </button>

      {show && (
        <div ref={eventsRef} className="flex w-full flex-col gap-8">
          {similarEvents.length > 0 ? (
            <>
              <h2>Similar Events</h2>
              <div className="events">
                {similarEvents.slice(0, 3).map((similarEvent) => (
                  <EventCard key={similarEvent.slug} {...similarEvent} />
                ))}
              </div>
            </>
          ) : (
            <p>The are no similar events</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimilarEventsToggle;
