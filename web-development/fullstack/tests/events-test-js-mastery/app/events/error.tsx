"use client";

import { useEffect } from "react";

export default function EventsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2>Failed to load events</h2>
      <button onClick={() => reset()} className="btn">
        Try again
      </button>
    </div>
  );
}
