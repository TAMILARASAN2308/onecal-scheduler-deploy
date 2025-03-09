import React, { useState } from 'react'
import { FiLogIn } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {

    const [showMagicLink, setShowMagicLink] = useState(false);
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [showGif, setShowGif] = useState(false);

    const handleMagicLinkClick = () => {
        setShowMagicLink(true);
    };

    const closeMagicLink = () => {
        setShowMagicLink(false);
        setEmail(""); 
        setEmailSent(false); // Reset email sent state
        setShowGif(false);
    };

    const sendMagicLink = async () => {
        if (!email) {
            setShowGif(false);
            alert("Email is required.");
            // alert(BASE_URL)
            return;
        }
        
    
        try {
            const response = await fetch(`https://onecal-scheduler-deploy.onrender.com/auth/send-magic-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
    
            const data = await response.json();
            if (response.ok) {
                setEmailSent(true);
                setShowGif(false);
                
            } else {
                setShowGif(false); 
                alert(data.message || "Failed to send Magic Link.");
                setEmailSent(false);
            }
        } catch (err) {
            setShowGif(false);
            setEmailSent(false);
            alert("Something went wrong. Try again later.");
            console.error("Error:", err);
           

        }
    };
    
  return (
    <>
    {/* Desktop View */}
    <div className='hidden md:flex flex-col justify-center gap-4 items-center bg-gray-100 min-h-screen font-poppins-font'>
        <div className='bg-white w-1/3 h-80 rounded-md flex flex-col justify-evenly'>
            <div className='flex justify-center gap-10 text-6xl font-semibold'>
                <FiLogIn />
                <h1><span className='font-bold'>O</span>ne<span className='font-bold text-cyan-500'>C</span>al</h1>
            </div>
            <div className="flex justify-center items-center w-full">
                <hr className="w-1/4 border-gray-400" />
                <p className="px-2 text-sm text-gray-600">Sign into OneCal via</p>
                <hr className="w-1/4 border-gray-400" />
            </div>
            <div className='flex flex-col justify-center items-center gap-8 '>
                {/* <div className=' border-2 border-gray-400 rounded-lg p-4 w-32 text-center hover:bg-gray-500 hover:text-white hover:border-none'>
                    Google
                </div>
                <div className=' border-2 border-gray-400 rounded-lg p-4 w-32 text-center hover:bg-gray-500 hover:text-white hover:border-none'>
                    GitHub
                </div> */}
                <div className=' border-2 border-gray-400 rounded-lg p-4 w-32 text-center hover:bg-gray-500 hover:text-white hover:border-none' onClick={handleMagicLinkClick}>
                    Magic Link
                </div>
                <Link to={'/'}><p className='text-blue-500 underline'>Back</p></Link>
            </div>
        </div>
        <div className='flex flex-col items-center text-sm font-normal text-gray-600'>
            <p>
            © 2024 OneCal.
            </p>
            <p>
            A secure and seamless booking system by OneFirewall.
            </p>
        </div>
     </div>


    {/* Mobile View */}
     <div className='md:hidden bg-white w-full min-h-screen rounded-md flex flex-col justify-between'>
                <div className='flex flex-col gap-12 mt-[100px] '>
                    <div className='flex flex-col justify-center items-center gap-10 text-6xl font-semibold'>
                        <FiLogIn />
                        <h1><span className='font-bold'>O</span>ne<span className='font-bold text-cyan-500'>C</span>al</h1>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <hr className="w-1/4 border-gray-400" />
                        <p className="px-2 text-sm text-gray-600">Sign into OneCal via</p>
                        <hr className="w-1/4 border-gray-400" />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-4'>
                        {/* <div className=' border-2 border-gray-400 rounded-lg p-4 w-32 text-center hover:bg-gray-500 hover:text-white hover:border-none'>
                            Google
                        </div>
                        <div className=' border-2 border-gray-400 rounded-lg p-4 w-32 text-center hover:bg-gray-500 hover:text-white hover:border-none'>
                            GitHub
                        </div> */}
                        <div className=' border-2 border-gray-400 rounded-lg p-4 w-32 text-center hover:bg-gray-500 hover:text-white hover:border-none' onClick={handleMagicLinkClick}>
                            Magic Link
                        </div>
                        <Link to={'/'}><p className='text-blue-500 underline'>Back</p></Link>
                    </div>
                </div> 
            <div className='flex flex-col items-center text-sm font-normal text-gray-600 mb-[50px]'>
                <p>© 2024 OneCal.</p>
                <p>A secure and seamless booking system by OneFirewall.</p>
            </div>
        </div>


        {/* Display MagicLink Container */}
        {showMagicLink && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-96">
          {!emailSent ? (
            <>
            {showGif?(
                <>
                <img src='/images/meet-gif.gif'></img>
                </>
            ):(
                <>
                <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Sign in with Magic Link</h2>
              <button onClick={closeMagicLink} className="text-gray-500 hover:text-gray-700">
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Enter your email, and we'll send you a Magic Link to sign in.
            </p>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <div className='flex justify-center'>
                <button className="w-1/2 bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600" onClick={async () => {
                            setShowGif(true);
                            await sendMagicLink(); 
                            // setEmailSent(true);
                        }}>
                Send Magic Link
                </button>
            </div>
                </>
            )
            }
            </>
            ) : (
                <>
                  <div className='flex flex-col justify-center items-center gap-4'>
                    <p className="text-green-600 font-semibold">Check your email for the Magic Link!</p>
                    <p className="text-gray-600 text-sm">If you don't see it, check your spam folder.</p>
                    <button 
                        className="text-gray-500 underline text-sm"
                        onClick={() => {
                            setEmailSent(false);
                            setShowMagicLink(false);
                            setEmail(""); 
                        }}
                    >
                        Go back to Login
                    </button>
                  </div>
                </>
              )}
          </div>
        </div>
      )}
    </>
  )
}

export default Login