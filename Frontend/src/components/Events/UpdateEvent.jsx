import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function UpdateEvent() {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    urlSlug: "",
    description: "",
    duration: "",
    videoCallProvider: "Google Meet",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/get-event/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setFormData(data); 
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/update-event/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update event");

      const updatedData = await response.json();
      console.log("Event Updated:", updatedData);
      navigate("/home"); // Redirect after update
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center font-poppins-font">
      <form onSubmit={handleSubmit} className="w-full px-6 md:px-0 md:w-1/3 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl text-center">Edit Appointment</h1>
        <h3 className="text-center">Update the appointment details below.</h3>

        <div className="flex flex-col">
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            className="border-2 border-gray-500 p-2 rounded-md bg-gray-100"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">URL Slug</label>
          <div className="flex items-center border-2 border-gray-500 rounded-md">
            <span className="text-gray-600 bg-slate-100 rounded-l-md p-2">OneCal/gmail/</span>
            <input
              type="text"
              name="urlSlug"
              value={formData.urlSlug}
              className="outline-none flex-1 p-2 rounded-r-md bg-gray-100 w-full"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            className="border-2 border-gray-500 p-2 rounded-md bg-gray-100"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Duration (Minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            className="border-2 border-gray-500 p-2 rounded-md bg-gray-100"
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Video Call Provider</label>
          <input
            type="text"
            name="videoCallProvider"
            value="Google Meet"
            className="border-2 border-gray-500 p-2 rounded-md bg-gray-100"
            readOnly
          />
        </div>

        <div className="flex justify-evenly pt-4">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => navigate("/home")}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEvent;
