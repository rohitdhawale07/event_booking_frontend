import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEventModal from "./components/AddEventModal"; // adjust path as needed
import EventsTable from "./components/EventsTable";
import { LogOut } from "lucide-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get user_type from localStorage
  const userStr = localStorage.getItem("user");
  const userType = userStr ? JSON.parse(userStr).user_type : undefined;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddEventClick = () => {
    setAddEventOpen(true);
  };

    const handleEventAdded = () => {
    setRefreshKey(prev => prev + 1); // 🔄 trigger rerender
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* You can replace this emoji with a logo */}
            <span className="text-white text-2xl">🎟️</span>
            <h1 className="text-white text-xl font-extrabold tracking-wide drop-shadow-lg select-none">
              Event Booking App
            </h1>
            {userType === "admin" && (
              <span className="ml-4 px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-semibold shadow-sm">
                Admin Panel
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {userType === "admin" && (
              <button
                onClick={handleAddEventClick}
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-50 active:scale-95 transition"
              >
                + Add Event
              </button>
            )}
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-red-400 text-white shadow hover:bg-red-600 active:scale-95 transition flex items-center justify-center"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={22} />
          </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto p-6">
        <EventsTable refreshKey = {refreshKey} />
      </main>

      <AddEventModal 
      open={addEventOpen} 
      onClose={() => setAddEventOpen(false)}
      onEventAdded={handleEventAdded} />
    </div>
  );
};

export default Dashboard;