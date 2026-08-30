"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { toast } from "@/components/ui/toast";
import { useState } from "react";

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

  // validar tiempo de expiración

  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const currentTime = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join(":");

  const expired =
    date < today ||
    (date === today && time.split(" to ")[0] <= currentTime);

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
