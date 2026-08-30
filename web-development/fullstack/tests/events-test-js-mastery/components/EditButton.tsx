"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import EditEventModal from "./EditEventModal";
import { type EventData } from "@/lib/types";

interface EditButtonProps {
  event: EventData;
}

const EditButton = ({ event }: EditButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className="action-edit" onClick={() => setIsModalOpen(true)}>
        Edit
      </button>
      {isModalOpen &&
        createPortal(
          <EditEventModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            event={event}
          />,
          document.body,
        )}
    </>
  );
};

export default EditButton;
