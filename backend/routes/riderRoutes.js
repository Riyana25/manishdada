const express = require('express');
const router = express.Router();
const riderController = require('../controllers/riderController');

// Define routes
// Register a new rider
router.post('/register', riderController.registerRider);

// Update rider information
router.put('/update/:riderId', riderController.updateRider);

// Book a ride
router.post('/book-ride', riderController.bookRide);

// View ride history
router.get('/ride-history/:riderId', riderController.getRideHistory);

// Rate a ride
router.post('/rate-ride/:rideId', riderController.rateRide);

// Cancel a ride
router.post('/cancel-ride/:rideId', riderController.cancelRide);

module.exports = router;
