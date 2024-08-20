const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define routes
router.post('/set-oil-price', adminController.setOilPrice);
router.get('/get-oil-price', adminController.getOilPrice);
router.post('/approve-rider/:riderId', adminController.approveRider);
router.post('/reject-rider/:riderId', adminController.rejectRider);
router.post('/set-vehicle-price', adminController.setVehiclePrice);
router.get('/users', adminController.getAllUsers);
router.get('/rides', adminController.getAllRides);
router.get('/ride/:rideId', adminController.getRideDetails);
router.put('/update-user/:userId', adminController.updateUser);
router.delete('/delete-user/:userId', adminController.deleteUser);
router.post('/add-vehicle', adminController.addVehicle);
router.delete('/delete-vehicle/:vehicleId', adminController.deleteVehicle);
router.get('/ratings', adminController.getAllRatings);
router.get('/ride-report', adminController.generateRideReport);

module.exports = router;
