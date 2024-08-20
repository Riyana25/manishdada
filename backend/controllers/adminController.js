const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const Ride = require('../models/ride');
const Rating = require('../models/rating');
const Config = require('../models/configModel'); // Import the config model

// Approve a rider
exports.approveRider = async (req, res) => {
    try {
        const { riderId } = req.params;
        const rider = await User.findByIdAndUpdate(riderId, { isActive: true }, { new: true });

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.status(200).json({ message: 'Rider approved successfully', rider });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Reject a rider
exports.rejectRider = async (req, res) => {
    try {
        const { riderId } = req.params;
        const rider = await User.findByIdAndUpdate(riderId, { isActive: false }, { new: true });

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.status(200).json({ message: 'Rider rejected successfully', rider });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Set or update the oil price
exports.setOilPrice = async (req, res) => {
    try {
        const { price } = req.body;
        if (price === undefined || typeof price !== 'number') {
            return res.status(400).json({ message: 'Invalid price' });
        }
        let config = await Config.findOne();
        if (!config) {
            config = new Config({ oilPrice: price });
        } else {
            config.oilPrice = price;
        }
        await config.save();
        res.status(200).json({ message: 'Oil price updated successfully', config });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get the current oil price
exports.getOilPrice = async (req, res) => {
    try {
        const config = await Config.findOne();
        if (!config) {
            return res.status(404).json({ message: 'Oil price not set' });
        }
        res.status(200).json({ oilPrice: config.oilPrice });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Set vehicle price
exports.setVehiclePrice = async (req, res) => {
    try {
        const { vehicleId, price } = req.body;

        // Validate price
        if (price === undefined || typeof price !== 'number') {
            return res.status(400).json({ message: 'Invalid price' });
        }

        // Find vehicle and update price
        const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { price }, { new: true });

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle price updated successfully', vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all users (for administrative purposes)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all rides (for administrative purposes)
exports.getAllRides = async (req, res) => {
    try {
        const rides = await Ride.find().populate('rider driver'); // Populate rider and driver details
        res.status(200).json({ rides });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get specific ride details
exports.getRideDetails = async (req, res) => {
    try {
        const { rideId } = req.params;
        const ride = await Ride.findById(rideId).populate('rider driver');

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update user information
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add a new vehicle
exports.addVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all ratings
exports.getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.find().populate('ride rater ratedUser');
        res.status(200).json({ ratings });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Generate ride statistics report
exports.generateRideReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const rides = await Ride.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).populate('rider driver');

        // Example report generation logic
        const totalRides = rides.length;
        const totalRevenue = rides.reduce((acc, ride) => acc + ride.cost, 0);

        res.status(200).json({ totalRides, totalRevenue, rides });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
