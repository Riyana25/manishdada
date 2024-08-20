const mongoose = require('mongoose');

// Define the Location schema
const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    }
}, { timestamps: true });

// Create a geospatial index on the coordinates field
locationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Location', locationSchema);
