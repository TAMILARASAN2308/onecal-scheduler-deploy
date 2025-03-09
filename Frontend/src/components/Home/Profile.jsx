import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { CiSettings } from "react-icons/ci";
import { FiLogIn } from "react-icons/fi";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Profile({ setActive, profileUpdated }) {
  const navigate = useNavigate(); 

  const [profileData, setprofileData] = useState({
      username: "",
      email: "",
      profilePhoto: null,
    });
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const storedEmail = localStorage.getItem("userEmail");
    
          if (!storedEmail) {
            console.error("No email found in localStorage");
            return;
          }
    
          const response = await fetch(`${BASE_URL}/auth/profile/${storedEmail}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
          // alert(data.profilePhoto);
          setprofileData({
            username: data.username || "",
            email: data.email || "",
            profilePhoto: data.profilePhoto ? `${BASE_URL}/${data.profilePhoto}` : null,
          });
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };
    
      fetchUserData();
    }, [profileUpdated]);

    // Handle Sign Out
  const handleSignOut = () => {
    localStorage.removeItem("userEmail");  // Clear stored email
    navigate("/login");  // Redirect to login page
  };

  // Handle Navigation to Settings
  const handleManageAccount = () => {
    setActive("Settings"); 
    navigate("/home/settings");  // Redirect to settings page
  };
  return (
    <>
    <div className='w-72 h-fit bg-white shadow-lg rounded-lg border border-gray-200 z-50'>
        <div className="flex items-center gap-3 p-4 border-b">
            <img src={profileData.profilePhoto}
                alt="Profile"
              className="w-11 h-11 rounded-full"/>
            <div>
                <h3 className="text-sm font-medium">{profileData.username}</h3>
                <p className="text-xs text-gray-500">{profileData.email || "No email found"}</p>
            </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleManageAccount}>
            <CiSettings className="" />
            <p>Manage account</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 cursor-pointer text-red-500 hover:bg-gray-100"  onClick={handleSignOut}>
            <FiLogIn />
            <p>Sign out</p>
        </div>
    </div>
    </>
  )
}

export default Profile