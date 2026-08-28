"use client";

import Image from "next/image";

const ExploreBtn = () => {
  return (
    <a
      href="#events"
      id="explore-btn"
      className="mt-8 mx-auto"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Explore Events
      <Image
        src="/icons/arrow-down.svg"
        alt="arrow-down"
        width={24}
        height={24}
        className="w-6 h-6"
      />
    </a>
  );
};

export default ExploreBtn;
