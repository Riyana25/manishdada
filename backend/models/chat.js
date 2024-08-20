const mongoose = require('mongoose');

// Define the Chat schema
const chatSchema = new mongoose.Schema({
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride', // Reference to the Ride model
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (sender of the message)
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (receiver of the message)
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Create a compound index to facilitate queries
chatSchema.index({ ride: 1, timestamp: 1 });

module.exports = mongoose.model('Chat', chatSchema);
