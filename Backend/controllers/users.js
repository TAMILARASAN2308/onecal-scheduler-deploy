const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require('../models/userModel');

const users = []; 

exports.sendMagicLink = async (req, res) => {
    try {
        const { email } = req.body; 
        console.log("Received email:", email);
        // Generate a unique token (valid for 15 minutes)
        // console.log("SECRET_KEY:", process.env.SECRET_KEY);
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "15m" });

        console.log("TOKEN:", token);
         // Create Magic Link
        const magicLink = `${process.env.BASE_URL}/verify-magic-link/${token}`;

         // Send email notification
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, 
            subject: "Your Magic Login Link",
            html: `<p>Hello,</p>
                    <p>Click the link below to log in:</p>
                    <a href="${magicLink}">${magicLink}</a>
                    <p>Thank you!</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Magic Link sent! Check your email." });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Error sending email", error });
    }
};

exports.verifyMagicLink = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { email } = decoded;

        // Check if user exists in MongoDB
        let user = await User.findOne({ email });

        if (!user) {
            // Extract username from email (before '@')
            const username = email.split("@")[0];

            user = new User({ email, username }); // Store extracted username
            await user.save();
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired Magic Link" });
    }
};


exports.sendEmail = async (req, res) => {
    const { recipientEmail, recipientName, eventTitle, senderName, senderEmail, dateTime, duration, meetLink, phoneNumber, pin, additionalInfo } = req.body;
  
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `Meeting Invitation: ${eventTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6;">
        <h2 style="margin-bottom: 15px;">${eventTitle}</h2>
        <p><strong>Host:</strong> ${senderName} (<a href="mailto:${senderEmail}" style="text-decoration: none; color: #007bff;">${senderEmail}</a>)</p>
        <p><strong>Recipient:</strong> ${recipientName} (<a href="mailto:${recipientEmail}" style="text-decoration: none; color: #007bff;">${recipientEmail}</a>)</p>
        <p><strong>Date & Time:</strong> ${dateTime}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Meeting Link:</strong> <a href="${meetLink}" style="text-decoration: none; color: #007bff;">${meetLink}</a></p>
        <p><strong>Phone Number:</strong> ${phoneNumber || "9876543210"}</p>
        <p><strong>PIN Code:</strong> ${pin || "600001"}</p>
        <p><strong>Additional Info:</strong> ${additionalInfo}</p>
        <p style="font-style: italic;">Looking forward to the meeting.</p>
        </div>`,
      };
  
    //   console.log(mailOptions);
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  };

// Event
const Event = require('../models/eventModel');

exports.addEvent = async (req, res) => {
    try {
        const { userEmail, title, urlSlug, description, duration, videoCallProvider } = req.body;

        if (!userEmail) {
            return res.status(400).json({ msg: "User email is required!" });
        }

        const newEvent = new Event({
            userEmail,  // Store the email in MongoDB
            title,
            urlSlug,
            description,
            duration,
            videoCallProvider
        });

        await newEvent.save();

        res.status(200).json({ msg: 'Event added successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'An error occurred, please try again later.' });
    }
};

exports.events = async (req, res) => {
    try {
        const { email } = req.params; // Get user email from request params

        if (!email) {
            return res.status(400).json({ msg: "User email is required" });
        }
        const events = await Event.find({ userEmail: email }); // Filter events by user email
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching user events:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.getEvent = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};



exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body; // Get updated fields from the request body

        const result = await Event.findByIdAndUpdate(
            id, 
            updatedData,
            { new: true, runValidators: true } 
        );

        if (!result) {
            return res.status(404).json({ msg: 'Event not found.' });
        }

        res.status(200).json({ msg: 'Event updated successfully.', result });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};


exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the event by ID
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ msg: 'Event not found.' });
        }

        res.status(200).json({ msg: 'Event deleted successfully.', deletedEvent });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Settings 
exports.updateProfile = async (req, res) => {
    const { email, username, removePhoto, gmeetLink  } = req.body; // Accept removePhoto flag
    let profilePhoto = req.file ? req.file.path.replace(/\\/g, "/") : null;  

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email, username, profilePhoto, gmeetLink });
            await user.save();
            return res.status(201).json({ message: 'User created successfully', user });
        }

        user.username = username || user.username;
        user.gmeetLink = gmeetLink || user.gmeetLink;

        if (removePhoto === "true") {
            user.profilePhoto = null; // Remove profile photo from DB
        } else if (profilePhoto) {
            user.profilePhoto = profilePhoto;
        }

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.profileData = async (req, res) => {

    const {email} = req.params

    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({
        username: user.username,
        email: user.email,
        profilePhoto: user.profilePhoto,
        gmeetLink: user.gmeetLink,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

// Availability 
exports.updateAvailability = async (req, res) => {
    try {
        const { email, availability } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        if (!availability || !Array.isArray(availability) || availability.length === 0) {
            return res.status(400).json({ error: "Availability data is required and must be an array" });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { $set: { availability } }, // Update only availability
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Availability updated", user });
    } catch (error) {
        console.error("Error updating availability:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getAvailability = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ availability: user.availability || [] });
    } catch (error) {
      console.error("Error fetching availability:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  
// Meetings
exports.bookings = async (req, res) => {
    try {
      const { email } = req.params;
  
      const bookings = await Booking.find({ email });
  
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Booking.findByIdAndUpdate(
            id, 
            { status: 'cancelled' }, 
            { new: true } 
        );

        if (!result) {
            return res.status(404).json({ msg: 'Booking not found.' });
        }

         // Send cancellation email
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: result.recipientEmail, 
            subject: `Booking Cancellation Confirmation`,
            text: `Your booking for ${result.title} on ${result.date} at ${result.time} has been canceled by the meeting conductor.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Cancellation email failed" });
            }
            console.log("Email sent:", info.response);
        });

        res.status(200).json({ msg: 'Booking cancelled and email sent successfully', result });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};


// Shared Event
  exports.eventDetailsUrlSlug = async (req, res) => {
    try {
      const { email, urlSlug } = req.params;
  
      // Find event based on email & urlSlug
      const event = await Event.findOne({ userEmail: email, urlSlug: urlSlug });
      const user = await User.findOne({ email });
    //   console.log("Fetching event:", email, urlSlug);
    //   console.log("Found event:", event);
    //   console.log("Found user:", user);

  
      if (!event || !user) {    
        return res.status(404).json({ message: "Event or User not found" });
      }
  
      // Get all booked time slots for this event
      const bookedSlots = await Booking.find({ email, status: { $in: ["upcoming", "past"] }  }).select("date time -_id");

      res.json({
        event,
        user,
        availability: user.availability || [],
        bookedSlots,
      });
    } catch (error) {
      console.error("Error fetching event details:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  const Booking = require("../models/bookingModel");
  
  exports.bookMeeting = async (req, res) => {
    try {
      const { email, urlSlug, name, recipientEmail, selectedDate, selectedTime, duration, gmeetLink } = req.body;

      if (!email || !urlSlug || !name || !selectedDate || !selectedTime || !duration || !recipientEmail) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (!gmeetLink) {
        return res.status(400).json({ message: "gmeetLink is required" });
      }
  
      // Fetch event details
      const event = await Event.findOne({ userEmail: email, urlSlug });
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      // Create a new booking object
      const newBooking = new Booking({
        email, // Creator email
        recipientName: name, // Recipient Name
        recipientEmail, // Recipient Email
        title: event.title,
        description: event.description,
        date: selectedDate,
        time: selectedTime,
        participants: ["You", name], // Store both participants
        duration,
        gmeetLink: gmeetLink || "No link available",
      });
  
      // Save the booking
      await newBooking.save();
      res.status(201).json({ message: "Meeting booked successfully!", booking: newBooking });
    } catch (error) {
      console.error("Error booking meeting:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  