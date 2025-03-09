import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function EventForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        urlSlug: '',
        description: '',
        duration: '',
        videoCallProvider: 'Google Meet',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const userEmail = localStorage.getItem("userEmail"); // Get email from local storage
    
        if (!userEmail) {
            alert("User is not logged in!");
            return;
        }
    
        const { title, urlSlug, description, duration, videoCallProvider } = formData;
    
        if (!title || !urlSlug || !description || !duration || !videoCallProvider) {
            alert("Please fill in all fields before submitting.");
            return;
        }
    
        try {
            const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/addEvent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, userEmail }) // Include email in request
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Event added successfully!");
                navigate('/home'); 
            } else {
                alert(data.msg || "Failed to add event.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Internal server error');
        }
    };
    

    return (
        <div className="w-full flex flex-col justify-center items-center font-poppins-font">
            <form onSubmit={handleSubmit} className="w-full px-6 md:px-0 md:w-1/3 flex flex-col gap-4">
                <h1 className='font-semibold text-2xl text-center'>Add New Appointment</h1>
                <h3 className='text-center'>Create a new appointment type that allows people to book you!</h3>

                <div className='flex flex-col'>
                    <label className='font-medium'>Title</label>
                    <input type="text" name="title" value={formData.title} className='border-2 border-gray-500 p-2 rounded-md bg-gray-100' onChange={handleChange} />
                </div>

                <div className='flex flex-col'>
                    <label className='font-medium'>URL Slug</label>
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

                <div className='flex flex-col'>
                    <label className='font-medium'>Description</label>
                    <textarea type="text" name="description" value={formData.description} className='border-2 border-gray-500 p-2 rounded-md bg-gray-100' onChange={handleChange}></textarea>
                </div>

                <div className="flex flex-col">
                    <label className='font-medium'>Duration (Minutes)</label>
                    <input 
                        type="number" 
                        name="duration" 
                        value={formData.duration} 
                        className="border-2 border-gray-500 p-2 rounded-md bg-gray-100" 
                        onChange={handleChange} 
                        min="1" 
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='font-medium'>Video Call Provider</label>
                    <input 
                        type="text" 
                        name="videoCallProvider" 
                        value="Google Meet" 
                        className='border-2 border-gray-500 p-2 rounded-md bg-gray-100' 
                        readOnly 
                    />
                </div>

                <div className="flex justify-evenly pt-4">
                    <button type="button" className='bg-gray-300 px-4 py-2 rounded-md' onClick={() => navigate('/home')}>Cancel</button>
                    <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md'>Create Event</button>
                </div>
            </form>
        </div>
    );
}

export default EventForm;
