"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const HandlerNavBar = () => {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <Navbar />
    </Suspense>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.svg" alt="logo" width={48} height={48} />

          <p>CrewEvents</p>
        </Link>

        <ul>
          <Link
            className={pathname === "/" ? "nav-link active" : "nav-link"}
            href="/"
          >
            Home
          </Link>
          <Link
            className={
              pathname.startsWith("/events") && !pathname.startsWith("/events/")
                ? "nav-link active"
                : "nav-link"
            }
            href="/events?page=1"
          >
            Events
          </Link>
          <Link
            className={
              pathname === "/events/create-event"
                ? "nav-link active"
                : "nav-link"
            }
            href="/events/create-event"
          >
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default HandlerNavBar;
