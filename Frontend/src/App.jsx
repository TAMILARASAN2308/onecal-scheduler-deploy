import React, { useState } from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home'
import Landingpage from './components/Landing Page/LandingPage'
import Login from './components/Login/Login'
import VerifyMagicLink from './components/VerifyMagicLink'
import Event from './components/Events/Event'
import Bookings from './components/Bookings/Bookings'
import Availability from './components/Availability/Availability'
import Settings from './components/Profile Settings/Settings'
import EventForm from './components/Events/EventForm'
import UpdateEvent from './components/Events/UpdateEvent'
import EventPage from './components/Shared Calendar/EventPage'
import EventConfirmation from './components/Shared Calendar/EventConfirmation'

function App() {
  const [profileUpdated, setProfileUpdated] = useState(false);

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-magic-link/:token" element={<VerifyMagicLink />} />
        <Route path="/OneCal/:email/:urlSlug" element={<EventPage />} />
        <Route path="/OneCal/event-confirmation" element={<EventConfirmation />} />

        {/* Home with Nested Routes */}
        <Route path="/home" element={<Home profileUpdated={profileUpdated}/>}>
          <Route index element={<Event />} />  {/* Default route */}
          <Route path="add-event" element={<EventForm />} />
          <Route path="update-event/:id" element={<UpdateEvent/>} />
          <Route path="meetings" element={<Bookings />} />
          <Route path="availability" element={<Availability />} />
          <Route path="settings" element={<Settings setProfileUpdated={setProfileUpdated} />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
