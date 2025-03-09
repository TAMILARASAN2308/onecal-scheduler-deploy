import React, { useState, useEffect } from "react";
import { Checkbox, Select, MenuItem } from "@mui/material";
import { timeSlots, defaultAvailability } from "../data";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Availability() {
  const [availability, setAvailability] = useState(defaultAvailability);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch availability data from the backend
    const fetchAvailability = async () => {
      try {
        const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/get-availability/${email}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        if (data.availability) {
          // Transform fetched data into state format
          const updatedAvailability = { ...defaultAvailability };
          data.availability.forEach(({ day, startTime, endTime }) => {
            updatedAvailability[day] = {
              isAvailable: true,
              startTime,
              endTime,
            };
          });

          setAvailability(updatedAvailability);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [email]); // Runs only once when the component mounts

  const handleCheckboxChange = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable,
      },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAvailability = Object.entries(availability)
      .filter(([day, value]) => value.isAvailable) // Keeps only items where isAvailable is true
      .map(([day, value]) => ({
        day,
        startTime: value.startTime,
        endTime: value.endTime,
      }));

    if (formattedAvailability.length === 0) {
      alert("Please select at least one availability day.");
      return;
    }

    try {
      const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/update-availability/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, availability: formattedAvailability }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      alert("Availability updated successfully");
      console.log("Availability updated successfully:", data);
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="w-full m-4 md:m-6 font-poppins-font flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-4xl text-cyan-500">Availability</h1>
        <p className="text-gray-600 text-sm md:text-base">Manage your availability</p>
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(defaultAvailability).map((day) => (
          <div key={day} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <Checkbox
              checked={availability[day].isAvailable}
              onChange={() => handleCheckboxChange(day)}
              sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
            />
            <span className="capitalize">{day}</span>
            {availability[day].isAvailable && (
              <>
                <Select
                  value={availability[day].startTime}
                  onChange={(e) => handleTimeChange(day, "startTime", e.target.value)}
                  className="w-20 md:w-24 h-8 border border-gray-400 rounded-md"
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                <span>to</span>
                <Select
                  value={availability[day].endTime}
                  onChange={(e) => handleTimeChange(day, "endTime", e.target.value)}
                  className="w-20 md:w-24 h-8 border border-gray-400 rounded-md"
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </div>
        ))}
        <button type="submit" className="border px-4 py-2 rounded-lg bg-black text-white font-medium text-sm md:text-base mt-6">
          Update Availability
        </button>
      </form>
    </div>
  );
}

export default Availability;
