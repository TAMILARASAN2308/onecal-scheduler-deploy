const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    profilePhoto: { type: String },
    gmeetLink: String,
    availability: {
        type: [
            {
                day: { type: String, required: true },
                startTime: { type: String, required: true },
                endTime: { type: String, required: true }
            }
        ],
        default: []
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
