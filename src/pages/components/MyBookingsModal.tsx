import React from "react";

interface Booking {
  _id: string;
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
  };
  user: {
    _id: string;
    email: string;
    name: string;   
  };
  seats: number;
  bookedAt: string;
}

interface MyBookingsModalProps {
  open: boolean;
  onClose: () => void;
  bookings: Booking[];
}

const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ open, onClose, bookings }) => {
  if (!open) return null;

  // User type and token
  const userStr = localStorage.getItem("user");
  const userType = userStr ? JSON.parse(userStr).user_type : undefined;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4 text-blue-700">My Bookings</h3>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => (
              <li
                key={b._id}
                className="p-4 rounded-lg border border-blue-100 bg-blue-50 shadow-sm"
              >
                <h4 className="font-semibold text-blue-800">{b.event?.title}</h4>
                <p className="text-sm text-gray-600">{b.event?.description}</p>
                <p className="text-sm text-gray-700">
                  📍 {b.event?.location}
                </p>
                <p className="text-sm text-gray-700">
                  📅 {new Date(b.event?.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700">
                  🎟 Seats booked: <span className="font-bold">{b.seats}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Booked at: {new Date(b.bookedAt).toLocaleString()}
                </p>
                {userType === "admin" && b.user && (
                  <p>
                    <span className="font-semibold">Booked by:</span>{" "}
                    {b.user.name} ({b.user.email})
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsModal;
