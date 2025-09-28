import React, { useEffect, useState, useMemo } from "react";
import { api } from "../../api";
import GenericTable, { type TableColumn, type TableOption } from "../components/GenericTable";
import AddEventModal from "./AddEventModal";
import { Pencil, Trash2, Book } from "lucide-react"; // Book icon
import BookEventModal from "./BookEventModal";
import MyBookingsModal from "./MyBookingsModal";

export interface EventItem {
  _id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  capacity: number;
  remainingSeats: number;
  bookingStatus?: string; // computed field for availability
}

const eventColumns: TableColumn<EventItem>[] = [
  { label: "Title", accessor: "title" },
  { label: "Description", accessor: "description" },
  { label: "Date", accessor: "date" },
  { label: "Location", accessor: "location" },
  { label: "Capacity", accessor: "capacity" },
  { label: "Remaining Seats", accessor: "remainingSeats" },
  { label: "Booking", accessor: "bookingStatus" },
];

const EventsTable: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [bookEventOpen, setBookEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [myBookings, setMyBookings] = useState<any[]>([]);

  // For editing event
  const [editEventOpen, setEditEventOpen] = useState(false);
  const [_editEventId, setEditEventId] = useState<string | null>(null);
  const [editEventData, setEditEventData] = useState<EventItem | null>(null);

  // Search state
  const [search, setSearch] = useState("");

  // User type and token
  const userStr = localStorage.getItem("user");
  const userType = userStr ? JSON.parse(userStr).user_type : undefined;
  const token = userStr ? JSON.parse(userStr).token : undefined;

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get("/events", token);
      setEvents(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch bookings for badge count
  const fetchBookings = async () => {
    try {
      let data = await api.get("/bookings", token);
      setMyBookings(data);
    } catch (err: any) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Edit event
  const handleEdit = async (event: EventItem) => {
    if (userType !== "admin") {
      alert("You don't have permission to perform this action.");
      return;
    }
    setEditEventOpen(true);
    setEditEventId(event._id);
    setEditEventData(null);
    try {
      const data = await api.get(`/events/${event._id}`, token);
      setEditEventData(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch event data");
      setEditEventOpen(false);
    }
  };

  // Delete event
  const handleDelete = async (event: EventItem) => {
    if (userType !== "admin") {
      alert("You don't have permission to perform this action.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete event "${event.title}"?`)) {
      try {
        await api.delete(`/events/${event._id}`, token);
        fetchEvents();
      } catch (err: any) {
        alert(err.message || "Failed to delete event");
      }
    }
  };

  // Open booking modal
  const handleBook = (event: EventItem) => {
    if (event.remainingSeats === 0) {
      alert("No seats available for this event.");
      return;
    }
    setSelectedEvent(event);
    setBookEventOpen(true);
  };

  // Submit booking
  const handleBookSubmit = async (seats: number) => {
    if (!selectedEvent) return;
    try {
      await api.post("/bookings", { eventId: selectedEvent._id, seats }, token);
      alert("Booking successful!");
      setBookEventOpen(false);
      setSelectedEvent(null);
      fetchEvents();
      fetchBookings(); // update badge count
    } catch (err: any) {
      alert(err.message || "Failed to book seats");
    }
  };

  // Open bookings modal
  const handleBookings = () => {
    setMyBookingsOpen(true);
  };

  const handleEditModalClose = () => {
    setEditEventOpen(false);
    setEditEventId(null);
    setEditEventData(null);
  };

  const options: TableOption<EventItem>[] = [
    { icon: <Book size={18} />, label: "Book Event", onClick: handleBook },
    { icon: <Pencil size={18} />, label: "Edit", onClick: handleEdit },
    { icon: <Trash2 size={18} />, label: "Delete", onClick: handleDelete },
  ];

  // Filter events
  const filteredEvents = useMemo(() => {
    if (!search.trim()) return events;
    const lower = search.trim().toLowerCase();
    return events.filter((ev) =>
      Object.values(ev).join(" ").toLowerCase().includes(lower)
    );
  }, [events, search]);

  const eventsWithStatus = useMemo(() => {
    return filteredEvents.map((ev) => ({
      ...ev,
      bookingStatus: ev.remainingSeats > 0 ? "Available" : "Not Available",
    }));
  }, [filteredEvents]);
  return (
    <div className="mt-5">
        {myBookingsOpen && (
        <MyBookingsModal
            open={myBookingsOpen}
            onClose={() => setMyBookingsOpen(false)}
            bookings={myBookings}
        />
        )}

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-blue-800 tracking-tight drop-shadow-lg">
          All Events
        </h3>
        <div className="flex items-center gap-3">
        {/* My Bookings button + badge wrapper */}
        <div className="relative">
            <button
            onClick={handleBookings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
            {userType === "admin" ? "See All Bookings" : "My Bookings"}
            </button>

            {myBookings.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                {myBookings.length}
            </span>
            )}
        </div>

        {/* Search bar */}
        <div className="relative">
            <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="pl-4 pr-10 py-2 rounded-lg border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-56 bg-white"
            />
            <span className="absolute right-3 top-2.5 text-blue-400 pointer-events-none">
            <svg width="20" height="20" fill="none">
                <path
                d="M19 19l-4-4m2-5A7 7 0 1 1 3 10a7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                />
            </svg>
            </span>
        </div>
        </div>

      </div>

      <div className="rounded-xl overflow-hidden shadow-xl bg-white/80 border border-blue-100 transition-all">
        {loading && (
          <div className="p-8 text-center text-blue-500 font-semibold tracking-wide">
            Loading events...
          </div>
        )}
        {error && (
          <div className="p-8 text-center text-red-500 font-semibold">{error}</div>
        )}
        {!loading && !error && (
          <GenericTable columns={eventColumns} data={eventsWithStatus} options={options} />
        )}
      </div>

      {bookEventOpen && selectedEvent && (
        <BookEventModal
            open={bookEventOpen}
            onClose={() => setBookEventOpen(false)}
            onSubmit={handleBookSubmit}
        />
        )}


      {editEventOpen && (
        <AddEventModal
          open={editEventOpen}
          onClose={handleEditModalClose}
          initialData={editEventData}
          mode="edit"
          onEventAdded={fetchEvents}
        />
      )}
    </div>
  );
};

export default EventsTable;
