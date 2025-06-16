"use client";

import { useEffect, useState } from "react";
import CustomLoader from "@/components/common/loader/page";
import { EventServices } from "@/services/events/route";
import { Event } from "./types";

const EventsData: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventLoading, setEventLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventLoading(true);
        const response = await EventServices.getAllEvents(currentPage, 10);
        console.log(response);
        setEvents(response);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError(`Error fetching events ${err}`);
      } finally {
        setEventLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await EventServices.deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (err) {
      alert("Failed to delete event");
      console.error(err);
    }
  };

  const renderEventsTable = () => (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-2">All Events</h2>
      {eventLoading ? (
        <CustomLoader />
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Host</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id}>
                  <td className="border px-4 py-2">{event.title}</td>
                  <td className="border px-4 py-2">
                    {event.host_id.full_name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(event.start_date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(event.end_date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border px-4 py-2 text-center">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="p-6 text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      {renderEventsTable()}

      {error}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 mx-2 cursor-pointer"
        >
          Prev
        </button>
        <span className="px-4 py-2">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={events.length < 10}
          className="px-4 py-2 bg-gray-200 mx-2 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventsData;
