const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Define routes
// Register a new driver
router.post('/register', driverController.registerDriver);

// Update driver information
router.put('/update/:driverId', driverController.updateDriver);

// Accept a ride request
router.post('/accept-ride', driverController.acceptRide);

// Complete a ride
router.post('/complete-ride/:rideId', driverController.completeRide);

// View ride history
router.get('/ride-history/:driverId', driverController.getRideHistory);

// Rate a rider
router.post('/rate-rider/:rideId', driverController.rateRider);

// Report an issue with a ride
router.post('/report-issue/:rideId', driverController.reportIssue);

module.exports = router;
