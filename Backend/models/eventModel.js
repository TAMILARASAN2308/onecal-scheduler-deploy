const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userEmail: { type: String, required: true }, 
    title: { type: String, required: true },
    urlSlug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    videoCallProvider: { type: String, required: true,default:"Google Meet" }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
