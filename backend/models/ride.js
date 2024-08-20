const mongoose = require('mongoose');

// Define the Ride schema
const rideSchema = new mongoose.Schema({
    rider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    startLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    endLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    distance: {
        type: Number, // Distance in kilometers or miles
        default: 0
    },
    cost: {
        type: Number, // Cost of the ride
        default: 0
    },
    rating: {
        type: Number, // Average rating for the ride
        default: 0
    },
    review: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Create a geospatial index on the startLocation and endLocation fields
rideSchema.index({ startLocation: '2dsphere' });
rideSchema.index({ endLocation: '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);
