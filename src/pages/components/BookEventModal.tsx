import React, { useState } from "react";

interface BookEventModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (seats: number) => void;
}

const BookEventModal: React.FC<BookEventModalProps> = ({ open, onClose, onSubmit }) => {
  const [seats, setSeats] = useState<number>(1);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-80">
        <h3 className="text-lg font-bold mb-4">Book Seats</h3>
        <input
          type="number"
          min={1}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(seats)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookEventModal;
