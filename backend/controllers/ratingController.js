const Rating = require('../models/rating');
const Ride = require('../models/ride');
const User = require('../models/user');

// Create a rating
exports.createRating = async (req, res) => {
    try {
        const { rideId, raterId, ratedUserId, rating, review } = req.body;

        // Validate input
        if (!rideId || !raterId || !ratedUserId || rating === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate rating value
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        // Check if the ride exists
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Create and save the new rating
        const newRating = new Rating({
            ride: rideId,
            rater: raterId,
            ratedUser: ratedUserId,
            rating,
            review,
            timestamp: new Date()
        });

        await newRating.save();
        res.status(201).json({ message: 'Rating created successfully', newRating });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get ratings for a specific user
exports.getUserRatings = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Retrieve ratings for the user
        const ratings = await Rating.find({ ratedUser: userId }).populate('rater ride');

        if (!ratings.length) {
            return res.status(404).json({ message: 'No ratings found for this user' });
        }

        res.status(200).json({ ratings });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get average rating for a specific user
exports.getUserAverageRating = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Retrieve ratings for the user
        const ratings = await Rating.find({ ratedUser: userId });

        if (!ratings.length) {
            return res.status(404).json({ message: 'No ratings found for this user' });
        }

        // Calculate the average rating
        const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get ratings for a specific ride
exports.getRideRatings = async (req, res) => {
    try {
        const { rideId } = req.params;

        // Validate input
        if (!rideId) {
            return res.status(400).json({ message: 'Ride ID is required' });
        }

        // Retrieve ratings for the ride
        const ratings = await Rating.find({ ride: rideId }).populate('rater ratedUser');

        if (!ratings.length) {
            return res.status(404).json({ message: 'No ratings found for this ride' });
        }

        res.status(200).json({ ratings });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a rating
exports.updateRating = async (req, res) => {
    try {
        const { ratingId } = req.params;
        const { rating, review } = req.body;

        // Validate input
        if (!ratingId || rating === undefined) {
            return res.status(400).json({ message: 'Rating ID and rating are required' });
        }

        // Validate rating value
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        // Update the rating
        const updatedRating = await Rating.findByIdAndUpdate(ratingId, { rating, review }, { new: true });

        if (!updatedRating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        res.status(200).json({ message: 'Rating updated successfully', updatedRating });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
    try {
        const { ratingId } = req.params;

        // Validate input
        if (!ratingId) {
            return res.status(400).json({ message: 'Rating ID is required' });
        }

        // Delete the rating
        const deletedRating = await Rating.findByIdAndDelete(ratingId);

        if (!deletedRating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
