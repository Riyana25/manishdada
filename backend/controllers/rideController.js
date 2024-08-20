const Ride = require('../models/ride');
const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const Location = require('../models/location');
const Rating = require('../models/rating');

// Create a new ride
exports.createRide = async (req, res) => {
    try {
        const { riderId, vehicleId, startLocationId, endLocationId } = req.body;

        // Validate input
        if (!riderId || !vehicleId || !startLocationId || !endLocationId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if rider, vehicle, and locations exist
        const rider = await User.findById(riderId);
        const vehicle = await Vehicle.findById(vehicleId);
        const startLocation = await Location.findById(startLocationId);
        const endLocation = await Location.findById(endLocationId);

        if (!rider || !vehicle || !startLocation || !endLocation) {
            return res.status(404).json({ message: 'Rider, vehicle, or location not found' });
        }

        // Create and save the new ride
        const ride = new Ride({
            rider: riderId,
            vehicle: vehicleId,
            startLocation: startLocationId,
            endLocation: endLocationId,
            status: 'booked',
            createdAt: new Date()
        });

        await ride.save();
        res.status(201).json({ message: 'Ride created successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get ride details
exports.getRideDetails = async (req, res) => {
    try {
        const { rideId } = req.params;

        // Validate input
        if (!rideId) {
            return res.status(400).json({ message: 'Ride ID is required' });
        }

        // Retrieve ride details
        const ride = await Ride.findById(rideId).populate('rider vehicle startLocation endLocation driver');

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update ride status
exports.updateRideStatus = async (req, res) => {
    try {
        const { rideId } = req.params;
        const { status } = req.body;

        // Validate input
        if (!rideId || !status) {
            return res.status(400).json({ message: 'Ride ID and status are required' });
        }

        // Update ride status
        const ride = await Ride.findByIdAndUpdate(rideId, { status }, { new: true });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ message: 'Ride status updated successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Calculate ride cost
exports.calculateRideCost = async (req, res) => {
    try {
        const { rideId } = req.params;

        // Validate input
        if (!rideId) {
            return res.status(400).json({ message: 'Ride ID is required' });
        }

        // Retrieve ride details
        const ride = await Ride.findById(rideId).populate('startLocation endLocation vehicle');

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        const { startLocation, endLocation, vehicle } = ride;

        // Example cost calculation based on distance
        const distance = calculateDistance(startLocation, endLocation); // Function to calculate distance
        const cost = distance * vehicle.pricePerDistance; // Assuming pricePerDistance is a field in Vehicle model

        res.status(200).json({ message: 'Ride cost calculated successfully', cost });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Helper function to calculate distance between two locations
function calculateDistance(startLocation, endLocation) {
    // Dummy implementation, replace with actual distance calculation logic
    // For example, you might use the Haversine formula or a third-party API
    const distance = Math.sqrt(
        Math.pow(endLocation.lat - startLocation.lat, 2) +
        Math.pow(endLocation.lon - startLocation.lon, 2)
    );
    return distance;
}

// End a ride
exports.endRide = async (req, res) => {
    try {
        const { rideId } = req.params;

        // Validate input
        if (!rideId) {
            return res.status(400).json({ message: 'Ride ID is required' });
        }

        // Update ride status to 'completed'
        const ride = await Ride.findByIdAndUpdate(rideId, { status: 'completed' }, { new: true });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ message: 'Ride ended successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Cancel a ride
exports.cancelRide = async (req, res) => {
    try {
        const { rideId } = req.params;

        // Validate input
        if (!rideId) {
            return res.status(400).json({ message: 'Ride ID is required' });
        }

        // Update ride status to 'cancelled'
        const ride = await Ride.findByIdAndUpdate(rideId, { status: 'cancelled' }, { new: true });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ message: 'Ride cancelled successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
