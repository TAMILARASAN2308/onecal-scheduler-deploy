const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');
const multer = require("multer");

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Login
router.post('/send-magic-link', userControllers.sendMagicLink);
router.get('/verify-magic-link/:token', userControllers.verifyMagicLink);

// Home (Fetch event based on mailId)
router.get('/events/:email', userControllers.events);
router.post('/addEvent', userControllers.addEvent);
// router.get("/profile/:email", userControllers.profileData); 
router.get('/get-event/:id', userControllers.getEvent);
router.put('/update-event/:id', userControllers.updateEvent);
router.delete('/delete-event/:id', userControllers.deleteEvent);

// Meetings
router.get("/bookings/:email",userControllers.bookings);
router.put('/cancel/:id', userControllers.updateBookingStatus);

// Availability
router.get("/get-availability/:email", userControllers.getAvailability);
router.put("/update-availability/:email", userControllers.updateAvailability);

// Settings (User data)
router.get("/profile/:email", userControllers.profileData);
router.post('/updateProfile', upload.single("profilePhoto"), userControllers.updateProfile);

// Shared Event
router.get("/event-details/:email/:urlSlug", userControllers.eventDetailsUrlSlug);
router.post("/book-meeting",userControllers.bookMeeting);
router.post('/send-email',userControllers.sendEmail);

module.exports = router;
