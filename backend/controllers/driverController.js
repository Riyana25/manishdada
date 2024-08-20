const User = require('../models/user');
const Ride = require('../models/ride');
const Rating = require('../models/rating');

// Register a new driver
exports.registerDriver = async (req, res) => {
    try {
        const driver = new User(req.body);
        driver.role = 'driver'; // Set role to driver
        await driver.save();
        res.status(201).json({ message: 'Driver registered successfully', driver });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update driver information
exports.updateDriver = async (req, res) => {
    try {
        const { driverId } = req.params;
        const updates = req.body;
        const driver = await User.findByIdAndUpdate(driverId, updates, { new: true });

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.status(200).json({ message: 'Driver updated successfully', driver });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Accept a ride request
exports.acceptRide = async (req, res) => {
    try {
        const { rideId, driverId } = req.body;
        const ride = await Ride.findByIdAndUpdate(rideId, { driver: driverId, status: 'accepted' }, { new: true });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ message: 'Ride accepted successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Complete a ride
exports.completeRide = async (req, res) => {
    try {
        const { rideId } = req.params;
        const ride = await Ride.findByIdAndUpdate(rideId, { status: 'completed' }, { new: true });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ message: 'Ride completed successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// View ride history
exports.getRideHistory = async (req, res) => {
    try {
        const { driverId } = req.params;
        const rides = await Ride.find({ driver: driverId }).populate('rider vehicle startLocation endLocation');

        if (!rides.length) {
            return res.status(404).json({ message: 'No rides found' });
        }

        res.status(200).json({ rides });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Rate a rider
exports.rateRider = async (req, res) => {
    try {
        const { rideId } = req.params;
        const { driverId, riderId, rating, review } = req.body;

        // Validate rating value
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const ride = await Ride.findById(rideId);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        const ratingEntry = new Rating({
            ride: rideId,
            rater: driverId,
            ratedUser: riderId,
            rating,
            review
        });

        await ratingEntry.save();
        res.status(201).json({ message: 'Rating submitted successfully', ratingEntry });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Report an issue with a ride
exports.reportIssue = async (req, res) => {
    try {
        const { rideId } = req.params;
        const { driverId, issueDescription } = req.body;

        const ride = await Ride.findById(rideId);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Add issue reporting logic here (e.g., save to an issues collection or notify admins)
        // For demonstration, we'll just update the ride with an issue description

        ride.issueDescription = issueDescription;
        await ride.save();

        res.status(200).json({ message: 'Issue reported successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
