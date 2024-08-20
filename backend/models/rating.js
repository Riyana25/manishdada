const mongoose = require('mongoose');

// Define the Rating schema
const ratingSchema = new mongoose.Schema({
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride',
        required: true
    },
    rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Create an index to facilitate queries
ratingSchema.index({ ride: 1, rater: 1 });

module.exports = mongoose.model('Rating', ratingSchema);
