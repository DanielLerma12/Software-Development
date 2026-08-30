"use client";

import { type EventData } from "@/lib/types";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface EditButtonProps {
  event: EventData;
}

const DeleteButton = ({ event }: EditButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/events/${event.slug}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.add({ title: "Failed to delete event" });
      return;
    }

    const deletedElement = await res.json();

    router.refresh();

    toast.add({
      title: (
        <span>
          Event:{" "}
          <span className="text-[#59deca] font-bold">
            {deletedElement.title}
          </span>{" "}
          deleted successfully
        </span>
      ),
    });
  };

  return (
    <>
      <button className="action-delete" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default DeleteButton;
