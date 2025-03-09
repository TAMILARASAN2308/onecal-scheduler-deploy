import React, { useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Settings({ setProfileUpdated }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePhoto: null,
    gmeetLink: "",
  });
  const [preview, setPreview] = useState(null);
  const [updated, setUpdated] = useState(false);

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("userEmail");
  
        if (!storedEmail) {
          console.error("No email found in localStorage");
          return;
        }
  
        const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/profile/${storedEmail}`, {
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
        setFormData({
          username: data.username || "",
          email: data.email || "",
          profilePhoto: data.profilePhoto ? `${BASE_URL}/${data.profilePhoto}` : null,
          gmeetLink: data.gmeetLink || "",
        });

        if (data.profilePhoto) {
          setPreview(`${BASE_URL}/${data.profilePhoto}`);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
  
    fetchUserData();
  }, [updated]);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value.trim(),
    });
     // URL.createObjectURL(files[0]) creates a temporary URL for the selected file. 
    setPreview(URL.createObjectURL(files[0]));
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, profilePhoto: null });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); //
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("gmeetLink", formData.gmeetLink);
    
    if (formData.profilePhoto) {
      formDataToSend.append("profilePhoto", formData.profilePhoto);
  } else {
      formDataToSend.append("removePhoto", "true"); 
  }

    try {
      const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/updateProfile`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Profile updated successfully!");
        setProfileUpdated(prev => !prev);

      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center font-poppins-font px-4 sm:px-0">
      <div className="flex flex-col gap-6 shadow-lg rounded-xl w-full sm:w-2/4 p-6">
        <div>
          <h1 className="font-semibold text-xl sm:text-2xl">Profile Details</h1>
          <h3 className="text-sm text-gray-600">Manage your account info!</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center sm:items-start gap-4">
          <div className="flex flex-col items-center">
            {formData.profilePhoto ? (
              <img
                src={preview}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                No Image
              </div>
            )}
            <div className="mt-2 flex flex-col items-center">
              {/* The hidden class hides the <input> field */}
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                className="hidden"
                id="fileInput"
                onChange={handleChange}
              />
              {/* htmlFor="fileInput"` connects the label to the input */}
              <label
                htmlFor="fileInput"
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
              >
                Upload
              </label>
              {formData.profilePhoto && (
                <button
                  type="button"
                  className="mt-1 text-red-600 text-sm"
                  onClick={handleRemoveImage}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              <label className="font-medium text-sm sm:text-base">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="border-2 border-gray-400 p-2 rounded-md bg-gray-100 text-sm sm:text-base w-full"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              <label className="font-medium text-sm sm:text-base">Gmeet Link</label>
              <input
                type="url"
                name="gmeetLink"
                placeholder="Enter your Gmeet link"
                className="border-2 border-gray-400 p-2 rounded-md bg-gray-100 text-sm sm:text-base w-full"
                value={formData.gmeetLink}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="text-gray-600 border border-gray-300 px-4 py-2 rounded-md text-sm"
              onClick={()=>setUpdated(!updated)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Save
            </button>
          </div>
        </form>
        <div className="mt-4 border-t pt-4 w-full">
          <p className="font-medium text-sm sm:text-base mb-2">Connected accounts</p>
          <div className="flex items-center text-sm">
            <img src="/images/google.png" alt="Google" className="w-5 h-5 mr-2" />
            <span className="text-gray-600 text-xs sm:text-sm">
              {formData.email || "No email connected"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
