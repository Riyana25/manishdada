const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Define routes

// Create a new ride
router.post('/create', rideController.createRide);

// Get ride details
router.get('/details/:rideId', rideController.getRideDetails);

// Update ride status
router.put('/status/:rideId', rideController.updateRideStatus);

// Calculate ride cost
router.get('/cost/:rideId', rideController.calculateRideCost);

// End a ride
router.put('/end/:rideId', rideController.endRide);

// Cancel a ride
router.delete('/cancel/:rideId', rideController.cancelRide);

module.exports = router;
