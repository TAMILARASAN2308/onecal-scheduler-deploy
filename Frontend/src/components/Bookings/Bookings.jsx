import React, { useEffect, useState, useMemo } from 'react';
import { CiCalendar } from "react-icons/ci";
import { GoClock, GoPeople } from "react-icons/go";
import { IoVideocamOutline } from "react-icons/io5";
import moment from "moment";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("upcoming");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      console.error("No email found in localStorage");
      return;
    }
    fetch(`${BASE_URL}/auth/bookings/${storedEmail}`)
      .then(response => response.json())
      .then(data => {
        setBookings(data);
        setFilteredBookings(data.filter(booking => booking.status === "upcoming"));
      })
      .catch(error => console.error("Error fetching bookings:", error));
  }, []);

  useEffect(() => {
    setFilteredBookings(bookings.filter(booking => booking.status === activeFilter));
  }, [bookings, activeFilter]);

  const handleCancelBooking = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/cancel/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      setBookings(prevBookings => prevBookings.map(booking => 
        booking._id === id ? { ...booking, status: 'cancelled' } : booking
      ));

      alert("Booking cancelled and cancellation email sent!");
      // filterBookings(activeFilter);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const filterBookings = (status) => {
    setActiveFilter(status);
    setFilteredBookings(bookings.filter(booking => booking.status === status));
  };

  const { total, upcoming, past, cancelled } = useMemo(() => {
    return {
      total: bookings.length,
      upcoming: bookings.filter(booking => booking.status === "upcoming").length,
      past: bookings.filter(booking => booking.status === "past").length,
      cancelled: bookings.filter(booking => booking.status === "cancelled").length,
    };
  }, [bookings]);

  return (
    <div className="w-full m-4 md:m-6 font-poppins-font">
      <div className='md:border-2 md:border-gray-500 md:rounded-md'>
        <div className='flex flex-col gap-4 p-4 md:p-6'>
        <div className="flex flex-wrap justify-between items-center">
            <h1 className='font-semibold text-2xl'>Bookings</h1>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4 text-sm md:text-base">
              <span className="px-3 py-1 rounded-lg bg-slate-300 ">Total: {total}</span>
              <span className="px-3 py-1 rounded-lg bg-slate-300">Upcoming: {upcoming}</span>
              <span className="px-3 py-1 rounded-lg bg-slate-300">Past: {past}</span>
              <span className="px-3 py-1 rounded-lg bg-slate-300">Cancelled: {cancelled}</span>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm md:text-base">
            See upcoming events booked with you and their event type links.
          </h3>

          <div className="flex gap-4 mb-4">
            <button 
              className={`px-4 py-2 rounded-lg ${activeFilter === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`} 
              onClick={() => filterBookings("upcoming")}>
              Upcoming
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${activeFilter === "past" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`} 
              onClick={() => filterBookings("past")}>
              Past
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${activeFilter === "cancelled" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`} 
              onClick={() => filterBookings("cancelled")}>
              Cancelled
            </button>
          </div>

          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <div key={index} className='flex flex-col gap-4 p-4 border-2 border-gray-500 rounded-md md:flex-row md:justify-between'>
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-2'>
                    <CiCalendar className='w-5 h-5' />
                    <p className="text-sm md:text-base">{booking.date}</p>
                  </div>
                  <div className='flex gap-2'>
                    <GoClock className='w-5 h-5' />
                    <p className="text-sm md:text-base">{`${booking.time} - ${moment(booking.time, "HH:mm").add(booking.duration, "minutes").format("HH:mm")}`}</p>
                  </div>
                  <div className='flex gap-2'>
                    <IoVideocamOutline className='w-5 h-5'/>
                    <a href={booking.gmeetLink} className='text-blue-900' target="_blank" rel="noopener noreferrer">
                      Join Meeting
                    </a>
                  </div>
                </div>

                <div className='flex flex-col gap-1'>
                  <h3 className='font-semibold'>{booking.title}</h3>
                  <div className='flex gap-2'>
                    <GoPeople className='w-5 h-5' />
                    <p className="text-sm md:text-base">{booking.participants.join(", ")}</p>
                  </div>
                </div>

                <div className='flex flex-col gap-1'>
                  <h3 className='font-semibold'>Description</h3>
                  <p className="text-sm md:text-base">{booking.description}</p>
                </div>

                <div className='flex flex-col gap-1'>
                  <h3 className='font-semibold'>Status</h3>
                  <p className={`text-sm md:text-base ${booking.status === "cancelled" ? "text-red-600" : booking.status === "past" ? "text-gray-600" : "text-green-600"}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </p>
                </div>

                {booking.status !== "cancelled" && booking.status !== "past" && (
                  <div className='flex justify-center md:block'>
                    <button className='border px-4 py-2 rounded-lg bg-red-600 text-white font-medium text-sm md:text-base' 
                      onClick={() => handleCancelBooking(booking._id)}>
                      Cancel Event
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No bookings found.</p>
          )}
        </div>   
      </div>
    </div>
  );
}

export default Bookings;
