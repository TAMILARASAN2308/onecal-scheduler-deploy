import React from "react";
import { GoPeople } from "react-icons/go";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function EventDisplay({data,setData}) {
  // Function to copy event URL
  const handleCopyLink = (urlSlug) => {
    const storedEmail = localStorage.getItem("userEmail");
    const eventUrl = `https://onecal-scheduler-deploy-1.onrender.com/OneCal/${storedEmail}/${urlSlug}`; // Construct full URL
    navigator.clipboard.writeText(eventUrl)  // Copy to clipboard
      .then(() => alert("Link copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err)); 
  };

  const onDelete = async (eventId) => {
    try {
      const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/delete-event/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      
      setData((prevData) => prevData.filter((event) => event._id !== eventId));
      alert("Event deleted successfully!");
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  
  return (
    <div className="w-full px-4 py-6 md:px-10 lg:px-16 font-poppins">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Events</h1>
          <p className="text-lg text-gray-600">Create and manage your events easily.</p>
        </div>
        <Link to={'/home/add-event'}><button className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-md font-medium shadow-md">
          + Create New Event
        </button>
        </Link>
      </div>

      {/* Event Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.length > 0 ? (
          data.map((event, index) => (
        <div key={index} className="border rounded-lg shadow-md bg-white overflow-hidden">
          {/* Event Header */}
          <div className="flex items-center gap-4 p-5 border-b">
            <GoPeople className="w-6 h-6 text-gray-700" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.duration} Minutes Meeting</p>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex  justify-evenly md:justify-between items-center p-4 bg-gray-100">
            <button className="border px-2 py-1 md:px-4 md:py-2 rounded-md text-gray-700 hover:bg-gray-200 transition" onClick={() => handleCopyLink(event.urlSlug)}>
              Copy Link
            </button>
            <Link to={`/home/update-event/${event._id}`}><button className="bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-700 transition">
              Edit Event
            </button></Link>
            <button className="bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-red-700 transition" onClick={() => onDelete(event._id)}>
              Delete
            </button>
          </div>
        </div>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-3">No events available.</p>
      )}
      </div>
    </div>
  );
}

export default EventDisplay;
