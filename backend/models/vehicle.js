const mongoose = require('mongoose');

// Define the Vehicle schema
const vehicleSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (driver)
        required: true
    },
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    licensePlate: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    color: {
        type: String,
        trim: true
    },
    capacity: {
        type: Number,
        default: 4 // Default capacity for most vehicles
    },
    isActive: {
        type: Boolean,
        default: true // Indicates if the vehicle is currently in use
    }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
