import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Components
import Profile from "./Profile";
import EventDisplay from "../Events/EventDisplay";

// Menu Icons
import { TiHomeOutline } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { MdOutlineEventAvailable } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { HiOutlineMenu, HiX } from "react-icons/hi";

function Home({ profileUpdated }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    profilePhoto: null,
  });
  const menuItems = [
    { name: "Event Types", path: "/home", icon: <TiHomeOutline className="w-5 h-5" /> },
    { name: "Meetings", path: "/home/meetings", icon: <GoPeople className="w-5 h-5" /> },
    { name: "Availability", path: "/home/availability", icon: <MdOutlineEventAvailable className="w-5 h-5" /> },
    { name: "Settings", path: "/home/settings", icon: <CiSettings className="w-5 h-5" /> },
  ];


  // Default Active menu is "Event Types"
  const [active, setActive] = useState("Event Types");
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
        try {
          const storedEmail = localStorage.getItem("userEmail"); // Get logged-in user's email
        if (!storedEmail) {
          console.error("No email found in localStorage");
          return;
        }

        const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/events/${storedEmail}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchBookings();

    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("userEmail");
        if (!storedEmail) {
          console.error("No email found in localStorage");
          return;
        }

        const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/profile/${storedEmail}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProfileData({
          username: data.username || "",
          email: data.email || "",
          profilePhoto: data.profilePhoto ? `https://onecal-scheduler-deploy.onrender.com/${data.profilePhoto}` : null,
        });
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchUserData();
  }, [location.pathname,profileUpdated]);

  useEffect(() => {
    // Find the menu item that matches the current path
    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
    if (currentMenuItem) {
      setActive(currentMenuItem.name);
      // localStorage.setItem("activeMenu", currentMenuItem.name); 
    }
  }, [location.pathname]); // It will run every time location.pathname changes.

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 font-poppins-font">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md w-full">
      <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
        </button>
        <h1 className="text-lg font-semibold">
          <span className="font-bold">O</span>ne<span className="font-bold text-cyan-500">C</span>al
        </h1>
        <div className="relative">
          <img
            src={profileData.profilePhoto}
            alt="Profile"
            className="w-11 h-11 rounded-full"
            onClick={() => setOpen(!open)}
          />
          {open && (
            <div className="absolute top-12 right-0">
              <Profile setActive={setActive} profileUpdated={profileUpdated}/>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="absolute md:hidden flex flex-col gap-3 w-3/5 bg-gray-100 shadow-md p-4 top-20 left-0 min-h-[90vh] z-50">
            {menuItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all text-base ${
                  active === item.name ? "bg-cyan-500 text-white font-medium" : "text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() => {
                  setActive(item.name);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                <h3>{item.name}</h3>
              </Link>
            ))}
          </div>
        )}
          {/* Sidebar */}
          <div className="hidden md:flex flex-col gap-3 w-1/5 px-4 py-6 bg-gray-100 shadow-md">
            {menuItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all text-base ${
                  active === item.name ? "bg-cyan-500 text-white font-medium" : "text-gray-600 hover:bg-gray-300"
                }`}
                // onClick={() => {
                //   setActive(item.name);
                //   localStorage.setItem("activeMenu", item.name); // Save selection to localStorage
                // }}
              >
                {item.icon}
                <h3>{item.name}</h3>
              </Link>
            ))}
          </div>

          {/* Render Nested Routes or Event Display */}
          {location.pathname === "/home" && eventData.length > 0 ? (
            <EventDisplay data={eventData} setData={setEventData} />
          ) : (
            <Outlet />
          )}
      </div>
    </div>
  );
}

export default Home;
