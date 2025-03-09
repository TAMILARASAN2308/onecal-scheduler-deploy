import React from 'react';
import { useNavigate } from 'react-router-dom';

function Event() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col justify-center items-center font-poppins-font">
            <div className='flex flex-col items-center gap-4 px-6 md:px-0 w-full md:w-1/3'>
                <h1 className='font-semibold text-2xl text-center'>You have no Event</h1>
                <p className='text-lg font-medium text-gray-500 text-center'>You can create your first event type by clicking the button below</p>
                <button className='border px-4 py-2 rounded-lg bg-blue-600 text-white font-medium' onClick={() => navigate('/home/add-event')}>Add Event</button>
            </div>
        </div>
    );
}

export default Event;
