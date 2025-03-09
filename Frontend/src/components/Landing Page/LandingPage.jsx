import React from 'react'
import { Link } from 'react-router-dom';

// Schedule Effortlessly
import { FaFreeCodeCamp } from "react-icons/fa";
import { GiPowerLightning } from "react-icons/gi";
import { GrSecure } from "react-icons/gr";
import { FaUserClock } from "react-icons/fa";

//Contact
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

// Footer
import { CiLinkedin } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Landingpage() {
    const testimonials = [
        {
            "quote": "OneCal has completely transformed how we schedule meetings. It's fast, efficient, and easy to use!",
            "name": "John Miller",
            "title": "Chief Executive Officer at SyncWorks",
            "img": "/images/profile1.png"
        },
        {
            "quote": "Managing my calendar has never been this smooth. OneCal saves me hours every week!",
            "name": "David Lee",
            "title": "Marketing Director at GrowthHub",
            "img": "/images/profile2.png"
        },
        {
            "quote": "I love how simple and intuitive OneCal is. It’s a game-changer for busy professionals!",
            "name": "Emily Carter",
            "title": "Founder at BrightPath Consulting",
            "img": "/images/profile3.png"
        },
        {
            "quote": "The best scheduling tool I’ve ever used! OneCal makes coordinating meetings effortless.",
            "name": "Surender Kumar",
            "title": "Founder & Chief Executive Officer at HighShine",
            "img": "/images/profile4.jpg"
        }
    ];

    const handleSubscribe = (event) => {
        event.preventDefault();
        const email = document.getElementById('subscribe_email').value;
        if (!email) {
          alert('Please enter an email address');
        } else {
          alert('Thank you for subscribing!');
        }
      };

  return (
    <>
    <nav className='flex justify-between m-4 font-poppins-font'>
        <h1 className='text-2xl'><span className='font-bold'>O</span>ne<span className='font-bold text-cyan-500'>C</span>al</h1>
        <Link to="/login">
        <button className='w-24 h-10 rounded-lg bg-cyan-500 text-white hover:bg-cyan-700'>Login</button>
        </Link>
    </nav>
    <section className='font-poppins-font'>
            <div className='flex flex-col justify-center items-center gap-8 my-[160px] px-4 md:px-0'>
                <h1 className='text-3xl md:text-8xl'>Effortless Scheduling</h1>
                <h1 className='text-2xl md:text-6xl text-cyan-500'>For Everyone!</h1>
                <p className='w-full md:w-2/4 text-center'>Managing your time shouldn't be stressful. With OneCal, you can easily book, manage, and track your reservations in a shared calendar—all in one place.</p>
                <Link to="/login"><button className='border p-4 rounded-xl bg-cyan-500 text-white'>Get Started for Free</button></Link>
            </div>

            <div className='flex flex-col justify-center items-center gap-8 px-4 md:px-0 md:gap-12 mb-[100px] md:mb-[150px]'>
                <h1 className='font-semibold text-2xl text-center md:text-4xl'>Trusted by the best companies in the world</h1>
                <div className="flex justify-evenly w-full">
                    <div className='flex flex-col gap-2 items-center'> 
                        <img src="images/google.png" alt="Google" className='w-16 h-16' />
                        <h3>Google</h3>
                    </div>
                    <div className='flex flex-col gap-2 items-center'>
                        <img src="images/microsoft.png" alt="Microsoft" className='w-16 h-16' />
                        <h3>Microsoft</h3>
                    </div>
                    <div className='flex flex-col gap-2 items-center'>
                        <img src="images/zoom.png" alt="Zoom" className='w-16 h-16' />
                        <h3>Zoom</h3>
                    </div>
                    <div className='flex flex-col gap-2 items-center'>
                        <img src="images/slack.png" alt="Slack" className='w-16 h-16' />
                        <h3>Slack</h3>
                    </div>
                </div>
            </div>



            <div className='flex flex-col md:flex-row items-center px-6 md:px-24 mb-[100px] md:mb-[150px]'>
                <div className=' w-full md:w-1/2 flex justify-center mb-6 md:mb-0'>
                    <img src='images/features.jpg' className='rounded-lg w-3/4 md:w-2/3'/>
                </div>
                <div className='flex flex-col w-full md:w-1/2 gap-6 '>
                    <h1 className='font-semibold text-4xl'>Powerful Features</h1>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <h2 className='font-semibold'>Easy Meeting Booking</h2>
                            <p className='pl-0 md:pl-8'>Clients can schedule meetings effortlessly based on your real-time availability.</p>
                        </div>
                        <div>
                            <h2 className='font-semibold'>Magic Link Access</h2>
                            <p className='pl-0 md:pl-8'>Users receive a unique Magic Link for secure and hassle-free meeting access.</p>
                        </div>
                        <div>
                            <h2 className='font-semibold'>Automated Notifications</h2>
                            <p className='pl-0 md:pl-8'>Get email reminders and confirmations for upcoming meetings.</p>
                        </div>
                        <div>
                            <h2 className='font-semibold'>Profile Management</h2>
                            <p className='pl-0 md:pl-8'>A dedicated profile section where users can update details and manage preferences.</p>
                        </div>
                    </div>
                </div>
                
            </div>



            <div className='flex flex-col justify-center items-center gap-4 font-poppins-font mb-[100px] md:mb-[150px] px-6'>
                <h3 className='text-center text-cyan-500'>Schedule Effortlessly</h3>
                <h1 className='font-semibold text-2xl text-center md:text-4xl '>Book Meetings in Just a Few Clicks</h1>
                <p className='w-full md:w-3/5 text-center'>With OneCal, scheduling meetings has never been easier. Manage your time, book appointments, and collaborate seamlessly—all in one place.</p>
                <div className="w-full md:w-3/4 flex flex-col md:flex-row  flex-wrap mt-12 gap-8 md:gap-0">

                    <div className=" w-full md:w-2/4 h-36 flex items-center p-4 gap-4 ">
                        <div className="w-12 h-12 flex items-center justify-center">
                        <FaFreeCodeCamp className='w-12 h-12 bg-cyan-500 text-white p-2 rounded-md' />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">Sign Up for Free</h3>
                            <p className="text-sm text-gray-600">
                            Get started instantly with a free account. No credit card required. Enjoy seamless scheduling with an intuitive interface designed for efficiency and ease.
                            </p>
                        </div>
                    </div>

                    <div className=" w-full md:w-2/4 h-36 flex items-center p-4 gap-4 ">
                        <div cclassName="w-12 h-12 flex items-center justify-center">
                        <GiPowerLightning className='w-12 h-12 bg-cyan-500 text-white p-2 rounded-md' />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">Lightning Fast</h3>
                            <p className="text-sm text-gray-600">
                            Book and manage time slots in seconds without delays. Our optimized algorithms ensure smooth, hassle-free scheduling every time, so you never miss an important meeting.
                            </p>
                        </div>
                    </div>

                    <div className=" w-full md:w-2/4 h-36 flex items-center p-4 gap-4 ">
                        <div className="w-12 h-12 flex items-center justify-center">
                        <GrSecure className='w-12 h-12 bg-cyan-500 text-white p-2 rounded-md'/>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">Secure & Reliable</h3>
                            <p className="text-sm text-gray-600">
                            Your data is encrypted with enterprise-grade security. We prioritize privacy and ensure top-tier protection for all your information, making OneCal a trusted choice.
                            </p>
                        </div>
                    </div>

                    <div className=" w-full md:w-2/4 h-36 flex items-center p-4 gap-4">
                        <div className="w-12 h-12 flex items-center justify-center">
                        <FaUserClock className='w-12 h-12 bg-cyan-500 text-white p-2 rounded-md'/>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">Simple & Intuitive</h3>
                            <p className="text-sm text-gray-600">
                            Designed for ease of use, so anyone can schedule effortlessly. No learning curve—just simple, efficient scheduling for everyone, helping you stay productive effortlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex flex-col gap-6 mb-[100px] md:mb-[150px]'>
                <h1 className='text-center font-semibold text-4xl'>Why People Love OneCal</h1>
                <div className='flex justify-evenly flex-wrap gap-6'>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="flex flex-col items-center justify-between gap-4 w-1/5 min-w-[250px] h-[250px] bg-white rounded-xl p-5 border border-gray-300">
                            <h2 className="text-center md:text-lg italic">"{testimonial.quote}"</h2>
                            <div className='flex justify-center gap-6'>
                                <img src={testimonial.img} className='w-12 h-12 rounded-full' alt="User avatar" />
                                <div>
                                    <h3 className="font-semibold">{testimonial.name}</h3>
                                    <h4 className="text-xs md:text-sm text-gray-500">{testimonial.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className='flex flex-col justify-center items-center gap-8 mb-[100px] md:mb-[0px] px-6'>
                <h1 className='font-semibold text-2xl md:text-4xl'>Start Using OneCal Now!</h1>
                <p className='text-gray-600 w-full md:w-1/3 text-center'>OneCal makes it easy for your clients to schedule a meeting with you.</p>
                <Link to="/login"><button className='border p-4 rounded-xl bg-cyan-500 text-white' >Get Started Now</button></Link>
            </div>



            <div className='flex justify-center md:relative md:top-24'>
                <div className='flex flex-col items-center md:flex-row md:justify-evenly md:items-center bg-cyan-500 w-full md:w-3/4 h-fit md:h-[190px] py-6 md:py-0 text-white md:rounded-lg border-8 border-white'>
                    <div className='flex flex-col justify-center items-center md:items-start'>
                        <div className='flex flex-col items-center md:flex-row gap-6'>
                            <FaPhoneAlt className='w-12 h-12 bg-black text-white p-2 rounded-md'/>
                            <h2 className='text-lg font-semibold'>Phone</h2>
                        </div>
                        <div className='text-md font-medium'>+1 234 567 890</div>
                    </div>
                    <div className="border-t-4 md:border-l-4 border-white w-28 md:w-0 md:h-24 my-4 md:my-0"></div>
                    <div className='flex flex-col justify-center items-center md:items-start'>
                        <div className='flex flex-col items-center md:flex-row gap-6'>
                            <IoMail className='w-12 h-12 bg-black text-white p-2 rounded-md'/>
                            <h2 className='text-lg font-semibold'>Email</h2>
                        </div>
                        <div className='text-md font-medium'>support@onecal.com</div>
                    </div>
                    <div className="border-t-4 md:border-l-4 border-white w-28 md:w-0 md:h-24 my-4 md:my-0"></div>
                    <div className='flex flex-col justify-center items-center md:items-start'>
                        <div className='flex flex-col items-center md:flex-row gap-6'>
                            <FaUserClock className='w-12 h-12 bg-black text-white p-2 rounded-md'/>
                            <h2 className='text-lg font-semibold'>Available</h2>
                        </div>
                        <div className='text-md font-medium'>Mon-Fri, 9 AM - 6 PM (IST)</div>
                    </div>
                </div>
            </div>
            



            <div className='flex flex-col justify-center bg-[#1D2122] w-full h-fit md:h-[491px] text-white px-6'>
                <div className=' flex flex-col md:flex-row justify-evenly gap-8 py-12 md:pt-28'>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Company Information</h2>
                        <div className="text-gray-400">
                            <p><span className='font-bold'>O</span>ne<span className='font-bold'>C</span>al</p>
                            <p>Simplifying scheduling for professionals.</p>
                            <address>
                            1234 Scheduling St,<br/>
                            Suite 567, Time City,<br/>
                            California, 90210, USA
                            </address>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Quick Links</h2>
                        <div className="text-gray-400">
                            <p>Home</p>
                            <p>Features</p>
                            <p>Pricing </p>
                            <p>Testimonials</p>
                            <p>Contact Us </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Support & Resources</h2>
                        <div className="text-gray-400">
                            <p>Help Center</p>
                            <p>FAQs</p>
                            <p>Privacy Policy</p>
                            <p>Terms of Service</p>
                        </div>
                       
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-lg font-semibold text-white">Social Media Links</h2>
                        <div className='flex md:justify-center gap-2'>
                            <CiLinkedin className='w-6 h-6'/>
                            <CiTwitter className='w-6 h-6' />
                            <FaFacebookSquare className='w-6 h-6' />
                            <FaInstagram className='w-6 h-6'  />
                        </div>
                        
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-4'>
                            <h2 className="text-lg font-semibold text-white">Newsletter Signup</h2>
                            <div className="text-gray-400">
                                <p>"Subscribe to get the latest updates!"</p>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <input name='email' className="rounded-md p-4 h-9 text-xs font-medium text-gray-400 bg-[#1D2122] border border-white" type='email' placeholder='Enter your email' id="subscribe_email"></input>
                            <button className='bg-cyan-500 rounded-md h-9 px-4' onClick={handleSubscribe}>send</button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-[1170px] h-[1px] bg-[#F5F5F5] mix-blend-overlay"></div>
                </div>
                
                {/* Desktop View */}
                <div className="hidden md:flex justify-evenly py-12">
                    <p className="text-[16px] font-normal text-gray-400"> Copyright © 2025 FlightBooker. <span className="font-semibold">Powered by OneWireWall.</span> All Rights Reserved.</p>
                    <div className="flex justify-between gap-24">
                        <p className="text-[16px] font-normal text-gray-400">Terms</p>
                        <p className="text-[16px] font-normal text-gray-400">Policy</p>
                    </div>
                </div>

                 {/* Mobile View */}
                <div className="md:hidden flex flex-col justify-evenly gap-2 py-12">
                    <div className="flex flex-col gap-2">
                        <p className="text-[16px] font-normal text-gray-400">Terms</p>
                        <p className="text-[16px] font-normal text-gray-400">Policy</p>
                    </div>
                    <p className="text-[16px] font-normal text-gray-400"> Copyright © 2025 FlightBooker</p>
                    <p className="text-[16px] text-gray-400 font-semibold">Powered by OneFireWall.</p>
                    <p className="text-[16px] font-normal text-gray-400">All Rights Reserved.</p>
                </div>
            </div>
    </section>
    </>
  )
}

export default Landingpage