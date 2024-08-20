const User = require('../models/user');
const Ride = require('../models/ride');
const Vehicle = require('../models/vehicle');
const Location = require('../models/location');
const Rating = require('../models/rating');

// Register a new rider
exports.registerRider = async (req, res) => {
    try {
        const rider = new User(req.body);
        rider.role = 'rider'; // Set role to rider
        await rider.save();
        res.status(201).json({ message: 'Rider registered successfully', rider });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update rider information
exports.updateRider = async (req, res) => {
    try {
        const { riderId } = req.params;
        const updates = req.body;
        const rider = await User.findByIdAndUpdate(riderId, updates, { new: true });

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.status(200).json({ message: 'Rider updated successfully', rider });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Book a ride
exports.bookRide = async (req, res) => {
    try {
        const { riderId, vehicleId, startLocationId, endLocationId } = req.body;
        const rider = await User.findById(riderId);
        const vehicle = await Vehicle.findById(vehicleId);
        const startLocation = await Location.findById(startLocationId);
        const endLocation = await Location.findById(endLocationId);

        if (!rider || !vehicle || !startLocation || !endLocation) {
            return res.status(404).json({ message: 'Rider, vehicle, or location not found' });
        }

        // Optional: Check if vehicle is available
        // if (vehicle.status !== 'available') {
        //     return res.status(400).json({ message: 'Vehicle is not available' });
        // }

        const ride = new Ride({
            rider: riderId,
            vehicle: vehicleId,
            startLocation: startLocationId,
            endLocation: endLocationId,
            status: 'booked'
        });

        await ride.save();
        res.status(201).json({ message: 'Ride booked successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// View ride history
exports.getRideHistory = async (req, res) => {
    try {
        const { riderId } = req.params;
        const rides = await Ride.find({ rider: riderId }).populate('vehicle startLocation endLocation');

        if (!rides.length) {
            return res.status(404).json({ message: 'No rides found' });
        }

        res.status(200).json({ rides });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Rate a ride
exports.rateRide = async (req, res) => {
    try {
        const { rideId } = req.params;
        const { raterId, ratedUserId, rating, review } = req.body;

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
            rater: raterId,
            ratedUser: ratedUserId,
            rating,
            review
        });

        await ratingEntry.save();
        res.status(201).json({ message: 'Rating submitted successfully', ratingEntry });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Cancel a ride
exports.cancelRide = async (req, res) => {
    try {
        const { rideId } = req.params;
        const ride = await Ride.findByIdAndUpdate(rideId, { status: 'cancelled' }, { new: true });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ message: 'Ride cancelled successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
