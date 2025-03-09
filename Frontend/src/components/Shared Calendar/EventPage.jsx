import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { GoClock, GoPeople } from "react-icons/go";
import { IoVideocamOutline } from "react-icons/io5";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function EventPage() {
  // Define State Variables
  const { email, urlSlug } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment().month());
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [bookedSlots, setBookedSlots] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    additionalInfo: "",
  });

  // Fetch Event Data
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/event-details/${email}/${urlSlug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const data = await response.json();
        setEventData(data.event);
        setUserData(data.user);
        setBookedSlots(data.bookedSlots);

        const processedAvailability = processAvailability(data.user.availability);
        setAvailability(processedAvailability);
      } catch (error) {
        setError(error.message);
        // alert(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [email, urlSlug]);

  // Process Availability Data
  const processAvailability = (availability) => {
    const availabilityMap = {};
    const today = moment();

    for (let i = 0; i < 365; i++) {
      const date = today.clone().add(i, "days");
      const dayName = date.format("dddd").toLowerCase();

      const availableSlot = availability.find(slot => slot.day.toLowerCase() === dayName);
      if (availableSlot) {
        availabilityMap[date.format("YYYY-MM-DD")] = generateTimeSlots(availableSlot.startTime, availableSlot.endTime);
      }
    }

    return availabilityMap;
  };

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let current = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");

    while (current.isBefore(end)) {
      slots.push(current.format("HH:mm"));
      current.add(30, "minutes");
    }

    return slots;
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event) => {
    setCurrentYear(parseInt(event.target.value, 10));
  };

  // Render Calendar for Date Selection

  const renderCalendar = () => {
    const firstDayOfMonth = moment([currentYear, currentMonth]).startOf("month").day();
    const totalDaysInMonth = moment([currentYear, currentMonth]).daysInMonth();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const date = moment([currentYear, currentMonth, day]).format("YYYY-MM-DD");
      const isAvailable = availability[date];

      days.push(
        <button
          key={day}
          className={`w-10 h-10 flex items-center justify-center rounded-full
            ${isAvailable ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
          onClick={() => isAvailable && setSelectedDate(date)}
          disabled={!isAvailable}
        >
          {day}
        </button>
      );
    }

    

    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <select value={currentMonth} onChange={handleMonthChange} className="border p-1 rounded">
            {moment.months().map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select value={currentYear} onChange={handleYearChange} className="border p-1 rounded">
            {[...Array(5)].map((_, index) => {
              const year = moment().year() + index;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
            <div key={i} className="text-center font-bold">{d}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!eventData) return <p className="text-center mt-10">No event found.</p>;

  const sendEmail = async () => {
    try {
      const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: formData.email,
          recipientName: formData.name,
          eventTitle: eventData.title,
          senderName: userData.username,
          senderEmail: userData.email,
          dateTime: `${selectedDate} ${selectedTime}`,
          duration: eventData.duration,
          meetLink: userData.gmeetLink,
          phoneNumber: "9876543210",
          pin: "600001",
          additionalInfo: formData.additionalInfo,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      alert("Please fill in all required fields and select a date and time.");
      return;
    }
  
    try {

      const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/book-meeting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          urlSlug,
          name: formData.name,
          recipientEmail: formData.email,
          selectedDate,
          selectedTime,
          duration: eventData.duration,
          gmeetLink: userData.gmeetLink,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        navigate('/OneCal/event-confirmation', { state: { email, urlSlug } });
        await sendEmail();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error booking meeting:", error);
      alert("Error booking meeting. Please try again later.");
    }
  };

  const isSlotBooked = (date, time) => {
    return bookedSlots.some(slot => slot.date === date && slot.time === time);
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 p-4 md:border-r">
            <h2 className="text-xl font-bold">{eventData.title}</h2>
            <p className="text-gray-600 font-semibold">{userData.username}</p>
            <p className="text-gray-500">{userData.email}</p>
            <div className="mt-4">
              <div className="flex gap-2 items-center"><GoClock className='w-5 h-5' /><p>{eventData.duration} minutes</p></div>
              <div className="flex gap-2 items-center"><IoVideocamOutline className='w-5 h-5'/><p>{eventData.videoCallProvider}</p></div>
            </div>
            <p className="text-gray-700 mt-4">{eventData.description}</p>
          </div>

          <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Date</h3>
              {renderCalendar()}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Select Time</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {selectedDate &&
                  availability[selectedDate]?.map((time, index) => (
                    <button
                      key={index}
                      className={`px-2 py-1 border rounded ${
                        isSlotBooked(selectedDate, time)
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Disabled state
                          : selectedTime === time
                          ? "bg-black text-white" // Selected state
                          : "bg-gray-200 text-black" // Default state
                      }`}
                      disabled={isSlotBooked(selectedDate, time)}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full md:w-1/3 md:self-end">
          <input
            className="p-2 border rounded"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded"
            type="text"
            name="additionalInfo"
            placeholder="Additional Information"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
          <button type="submit" className="p-2 bg-black text-white rounded">
            Submit
          </button>
        </form>

      </div>
    </div>
  );
}

export default EventPage;

