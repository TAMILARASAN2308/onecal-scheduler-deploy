const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientEmail : { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  participants: { type: [String], required: true },
  duration : { type: Number, required: true },
  gmeetLink: { type: String, required: true },
  status: {
    type: String,
    enum: ["upcoming", "past", "cancelled"],
    default: "upcoming",
  },

});
  
// Middleware to update status before saving
bookingSchema.pre("save", function (next) {
    const nowIST = new Date(); // Current time in IST
    const bookingIST = new Date(`${this.date}T${this.time}:00`); // Booking date-time in IST
  
    if (this.status !== "cancelled") {
      this.status = bookingIST < nowIST ? "past" : "upcoming";
    }
  
    next();
  });
  
  // Function to update past bookings dynamically
  async function updatePastBookings() {
    console.log("Checking for past bookings...");
  
    const nowIST = new Date();
    console.log(`Current Time (IST): ${nowIST.toISOString()}`);
  
    const bookings = await Booking.find({ status: { $ne: "cancelled" } });
  
    for (let booking of bookings) {
      const bookingIST = new Date(`${booking.date}T${booking.time}:00`);
  
      console.log(`Booking ID: ${booking._id}`);
      console.log(`Booking Time (IST): ${bookingIST.toISOString()}`);
  
      if (bookingIST < nowIST && booking.status !== "past") {
        booking.status = "past";
        await booking.save();
        console.log(`Updated booking (${booking._id}) to past.`);
      }
    }
  }
  
  // Run status update every 1 minute
  setInterval(updatePastBookings, 60 * 1000);


const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
