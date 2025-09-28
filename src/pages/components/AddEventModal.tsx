import React, { useState, useEffect } from "react";
import { api } from "../../api";
import type { EventItem } from "./EventsTable";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  onEventAdded?: () => void;
  initialData?: EventItem | null;
  mode?: "add" | "edit";
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onClose,
  initialData,
  onEventAdded,
  mode,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDate(initialData.date ? initialData.date.slice(0, 10) : "");
      setLocation(initialData.location || "");
      setCapacity(initialData.capacity ?? 1);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setCapacity(1);
    }
  }, [initialData, open]);

  if (!open) return null; // <--- always AFTER hooks

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userStr = localStorage.getItem("user");
    const token = userStr ? JSON.parse(userStr).token : undefined;
    const payload = { title, description, date, location, capacity };

    try {
      if (mode === "edit" && initialData && initialData._id) {
        await api.put(`/events/${initialData._id}`, payload, token);
      } else {
        await api.post("/events", payload, token);
      }
      if (onEventAdded) onEventAdded();
      onClose();
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setCapacity(1);
    } catch (err: any) {
      setError(err.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };
  
return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-pink-900/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white/95 rounded-2xl shadow-2xl min-w-[340px] max-w-sm w-full p-7 relative border border-blue-100"
      onClick={handleContentClick}
    >
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-blue-500 transition text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
        onClick={onClose}
        type="button"
        aria-label="Close"
      >
        &times;
      </button>
      <h4 className="text-xl font-extrabold mb-5 text-blue-700 text-center tracking-tight">
        Add New Event
      </h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            placeholder="Title"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            name="date"
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            name="location"
            placeholder="Location"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
          <input
            name="capacity"
            type="number"
            min={1}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-5 py-2 rounded-lg shadow font-semibold hover:bg-blue-600 active:scale-95 transition
            ${loading ? "bg-blue-300 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? 
            
        "Saving..." : mode === "edit" ? "Save Changes" : "Add Event"}
          </button>
        </div>
        {error && <div className="text-red-500 text-center text-sm font-medium animate-pulse">{error}</div>}
      </form>
    </div>
  </div>
);
};

export default AddEventModal;