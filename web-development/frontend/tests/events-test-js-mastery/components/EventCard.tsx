import Link from "next/link";
import Image from "next/image";
import { type EventData } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventCard = ({ title, image, slug, venue, date, time }: EventData) => {
  return (
    <Link href={`${BASE_URL}/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        className="poster"
        width={410}
        height={300}
        loading="eager"
      />

      <div className="flex grow gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} style={{ width: "auto", height: "auto" }} />
        <p>{venue}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <div>
          <Image src="/icons/calendar.svg" alt="date" width={14} height={14} style={{ width: "auto", height: "auto" }} />
          <p>{date}</p>
        </div>
        <div>
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} style={{ width: "auto", height: "auto" }} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
